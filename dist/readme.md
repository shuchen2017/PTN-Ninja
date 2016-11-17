# PTN Ninja

This is an editor and viewer for [Portable Tak Notation (PTN)](https://www.reddit.com/r/Tak/wiki/portable_tak_notation). It aims to be...

* Intuitive, with a minimal UI that is enjoyable to use.
* Interactive, with an editing experience that teaches or aides understanding of notation.
* Responsive, with a fluid design that works as well on a phone as it does in fullscreen on a desktop.

If you want to support this project, you can...

* [Report an issue](https://github.com/gruppler/PTN-Ninja/issues/)
* [Donate Bitcoins](bitcoin:12mD2HUNb4MJoLfVDDLS1wep1hdhrSY3L8)
* [Donate USD](https://www.paypal.me/gruppler)

## Getting Started

To load a "**.ptn**" file, **drag** the file into the window, or select **Open** from the menu, or copy the contents and paste into the editor.

Toggle between **Edit Mode** and **Play Mode** using the FAB (the big button in the lower-right corner).

If there are any problems with the PTN, the FAB will turn red, and clicking it will display the error message(s). The editor checks the validity of the syntax as well as the legality of each ply. You can click the error message to move the caret to the relevant position in the PTN.

## 3D Mode

3D Mode is experimental and may not work well or at all on some browsers or devices. It works best on Chrome.

In 3D Mode, you can rotate the view by **dragging** with **two fingers** on a touchscreen, or by holding <kbd>&#x2318;/Ctrl</kbd> while <kbd>left-click</kbd> **dragging**, or by <kbd>middle-click</kbd> **dragging**.

You can reset the board rotation with <kbd>&#x2318;/Ctrl</kbd> + <kbd>double-left-click</kbd>, or with a <kbd>double-middle-click</kbd>.

## Hotkeys
### Global
Key|Action
:--|:--
<kbd>Esc</kbd>|Toggle Menu
<kbd>&#x2318;/Ctrl</kbd> + <kbd>Space</kbd>|Toggle Edit/Play Mode
<kbd>&#x2318;/Ctrl</kbd> + <kbd>s</kbd>|Download .ptn File
<kbd>&#x2318;/Ctrl</kbd> + <kbd>o</kbd>|Open .ptn File
<kbd>&#x2318;/Ctrl</kbd> + <kbd>d</kbd>|Load Default PTN
<kbd>&#x2318;/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>/</kbd>|Help/About PTN Ninja

### Play Mode
Key|Action
:--|:--
<kbd>Space</kbd>|Play/Pause
<kbd>&larr;</kbd>|Previous Ply
<kbd>&rarr;</kbd>|Next Ply
<kbd>Shift</kbd> + <kbd>&larr;</kbd>|Previous Half-Ply
<kbd>Shift</kbd> + <kbd>&rarr;</kbd>|Next Half-Ply
<kbd>&uarr;</kbd>|Previous Move
<kbd>&darr;</kbd>|Next Move
<kbd>&#x2318;/Ctrl</kbd> + <kbd>&larr;</kbd>|First Ply
<kbd>&#x2318;/Ctrl</kbd> + <kbd>&rarr;</kbd>|Last Ply
<kbd>3</kbd>|Toggle 3D Board
<kbd>Shift</kbd> + <kbd>a</kbd>|Toggle Board Animations
<kbd>Shift</kbd> + <kbd>f</kbd>|Toggle Mode Button (FAB)
<kbd>a</kbd>|Toggle Annotations
<kbd>c</kbd>|Toggle Play Controls
<kbd>h</kbd>|Toggle Square Highlight
<kbd>r</kbd>|Toggle Road Connections
<kbd>f</kbd>|Toggle Player Flat Count
<kbd>m</kbd>|Toggle Current Move
<kbd>u</kbd>|Toggle Unplayed Pieces
<kbd>x</kbd>|Toggle Axis Labels

### Edit Mode
Key|Action
:--|:--
<kbd>&#x2318;/Ctrl</kbd> + <kbd>z</kbd>|Undo
<kbd>&#x2318;/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>z</kbd>|Redo
<kbd>&#x2318;/Ctrl</kbd> + <kbd>y</kbd>|Redo
<kbd>&#x2318;/Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>c</kbd>|Trim to current ply*

*This deletes all plies before and including the current ply, storing the current board position in a TPS tag in the header.


## Legal
&copy; 2016 Craig Laparo

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.