// PTN Ninja by Craig Laparo is licensed under a Creative Commons
// Attribution-NonCommercial-ShareAlike 4.0 International License.
// http://creativecommons.org/licenses/by-nc-sa/4.0/

'use strict';

define(['app/config', 'i18n!nls/main', 'lodash'], function (config, t, _) {

  var Piece = function (board, player, stone) {
    this.needs_updated = true;
    this.is_selected = false;
    this.board = board;
    this.player = 1*player || 1;
    this.stone = stone || 'F';
    this.true_stone = stone == 'C' ? stone : 'F';
    this.ply = null;
    this.square = null;
    this.captor = null;
    this.captives = [];
    this.piece_index = board.pieces[this.player][this.true_stone].length;
    if (this.stone == 'C') {
      this.piece_index += board.piece_counts.F;
    }

    board.all_pieces.push(this);
    board.pieces[this.player][this.true_stone].push(this);

    _.bindAll(this, 'render');

    return this;
  };

  Piece.prototype.to_tps = function () {
    return _.map(this.captives, 'player').reverse().join('')
      + this.player
      + (this.stone == 'F' ? '' : this.stone);
  };

  Piece.prototype.set_ply = function (ply) {
    this.ply = ply;
    if (!ply.is_slide) {
      this.stone = ply.stone;
    }
  };

  Piece.prototype.set_captives = function (captives) {
    var that = this;

    this.captor = null;
    this.captives = captives || [];

    _.each(this.captives, function (captive, index) {
      captive.stack_index = index;
      captive.captor = that;
      captive.square = that.square;
      captive.stone = 'F';
      captive.captives.length = 0;
    });
  };

  Piece.prototype.render = function () {
    var that = this
      , square = this.square
      , location, captive_offset = 6;

    if (this.board.defer_render) {
      this.needs_updated = true;
      return;
    }

    // Set Z
    if (this.captor) {
      // Captive
      this.z = this.captor.captives.length - this.stack_index;
      this.is_immovable = this.stack_index >= this.board.size - 1;
    } else if (this.captives.length) {
      // Captor
      this.z = this.captives.length + 1;
      this.is_immovable = false;
      _.invokeMap(this.captives, 'render');
    } else {
      this.is_immovable = false;
      if (square) {
        this.z = 1;
      } else if(config.board_3d && this.stone == 'C') {
        this.z = this.piece_index
          - (this.board.piece_counts.F % this.board.size);
      } else {
        this.z = this.piece_index;
      }
    }

    // Set X and Y
    if (square) {
      // Played pieces

      this.x = 100*square.col;
      this.y = -100*square.row;

      if (config.board_3d) {
        // 3D

        if (this.is_selected) {
          this.z += 3;
        }
      } else {
        // 2D

        if(this.is_immovable) {
          this.y += captive_offset*(1 - this.z);
        } else {
          this.y += captive_offset*(
            1 - this.z + 1*(this.stone == 'S' && !!this.captives.length)
            - (this.is_selected ? 3 : 0)
          );

          if ((this.captor||this).z > this.board.size) {
            this.y += captive_offset*((this.captor||this).z - this.board.size);
          }
        }
      }
    } else {
      // Unplayed pieces

      if (config.board_3d) {
        // 3D

        this.x = 100*this.board.size;

        if (this.player == 2) {
          this.x += 75;
        }

        if (this.stone == 'C') {
          this.y = (this.board.size - 1) * -100;
        } else {
          this.y = (this.board.size - 1) * -100
            * Math.floor(this.piece_index / this.board.size)
            / Math.floor(
              this.board.piece_counts.F / (
                this.board.size
                - 1*!!(
                  this.board.piece_counts.C
                  && (this.board.piece_counts.F % this.board.size)
                )
              )
            );
        }

        this.z = this.z % this.board.size + 1;
      } else {
        // 2D

        this.z += this.board.piece_counts.total;
        this.x = 100*this.board.size;

        if (this.player == 2) {
          this.z += this.board.piece_counts.total;
          this.x += 75;
        }

        this.y = (this.board.size - 1) * -100 * this.piece_index / this.board.piece_counts.total;
      }
    }

    this.x = Math.round(1000*this.x)/1000;
    this.y = Math.round(1000*this.y)/1000;
    this.z -= 1;

    // Render or update the view
    if (!this.$view) {
      this.$view = $(this.tpl.piece(this));
      this.$stone = this.$view.find('.stone');
      this.$captive = this.$view.find('.captive');
      this.$view.data('model', this);
    } else {
      this.$view[0].style = this.tpl.location(this);
      this.$view[0].className = this.tpl.piece_class(this);
      this.$stone[0].className = this.tpl.stone_class(this);
    }

    if (!app.$html[0].contains(this.$view[0])) {
      this.board.$pieces.append(this.$view);
    }

    this.needs_updated = false;

    return this.$view;
  };

  Piece.prototype.tpl = {
    piece_class: _.template(
      'piece'+
      '<% if (square) { %>'+
        '<% if (is_immovable) { %>'+
          ' immovable'+
        '<% } %>'+
      '<% } else { %>'+
        ' unplayed'+
      '<% } %>'
    ),
    location: _.template(
      'transform: translate3d(<%=x%>%, <%=y%>%, <%=z%>em);'
    ),
    stone_class: _.template('stone p<%=player%> <%=stone%>'),
    piece: _.template(
      '<div class="<%=tpl.piece_class(obj)%>" '+
        ' style="<%=tpl.location(obj)%>"'+
      '>'+
        '<div class="captive p<%=player%>"></div>'+
        '<div class="<%=tpl.stone_class(obj)%>"></div>'+
      '</div>'
    )
  };

  return Piece;

});
