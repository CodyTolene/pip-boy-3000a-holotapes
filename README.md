<div align="center">
  <img align="center" src=".github/images/logo.png" height="400" />
  <h1 align="center">Pip-Boy 3000a Holotapes</h1>
  <p align="center">
    A community driven repository of custom applications and games for the 
    <a href="https://www.thewandcompany.com/pip-boy-3000/" target="_blank">Pip-Boy 3000a</a>, 
    hosted on <a href="https://www.pip-boy.com/" target="_blank">pip-boy.com</a>.
  </p>
  <p align="center">
    <a href="https://pip-boy.com" target="_blank">
      Pip-Boy.com
    </a>&nbsp;|&nbsp;
    <a href="https://discord.com/invite/zQmAkEg8XG" target="_blank">
      Discord Community
    </a>&nbsp;|&nbsp;
    <a href="https://gear.bethesda.net/products/fallout-pip-boy-3000-replica" target="_blank">
      Bethesda Store
    </a>&nbsp;|&nbsp;
    <a href="https://www.thewandcompany.com">
      The Wand Company
    </a>&nbsp;|&nbsp;
    <a href="https://www.espruino.com" target="_blank">
      Espruino
    </a>|&nbsp;
    <a href="https://log.robco-industries.org/" target="_blank">
      RobCo Industries
    </a>
  </p>
</div>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## Index <a name="index"></a>

- [Description](#description)
- [Creating a new Holotape](#create)
- [Development Workflow](#development)
- [Images](#images)
- [Input handling](#input)
- [Memory and Performance](#memory)
- [Contributing](#contributing)
- [License(s)](#licenses)

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## Description <a name="description"></a>

Pip-Boy 3000a Holotapes by the community, for the community.

Install on: [pip-boy.com][link-pip-boy]

Follow the guide below to create your own custom Holotapes for the Pip-Boy
3000a!

<p align="right">[ <a href="#index">Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## Creating a new Holotape <a name="create"></a>

1. Create a new folder in the `holotapes` directory for your app or game.

2. Add a `README.md` file with a description of your app or game, installation
   instructions, and any other relevant information within.

3. Add a `ChangeLog` file to track changes and updates to your app or game.

4. Add your app or game's code files to the folder. Example Code:

   <details>
   <summary>Expand/Collapse</summary>

   ```js
   (function () {
     const APP_ID = 'EXAMPLE';
     const W = h.getWidth();
     const H = h.getHeight();

     let redrawInterval;
     let removed = false;
     let leftWheelPressWatch;

     const state = {
       lastInput: 'NONE',
       leftWheel: 0,
       rightWheel: 0,
       leftWheelPress: 0,
     };

     function mark(input) {
       state.lastInput = input;
       if (Pip.playSound) Pip.playSound('TAB');
       draw();
     }

     function draw() {
       h.clear(1);

       h.setColor(3)
         .setFontMonofonto28()
         .setFontAlign(0, 0)
         .drawString(APP_ID, W / 2, 50);

       h.setFontMonofonto18().drawString(
         'LAST: ' + state.lastInput,
         W / 2,
         100,
       );

       h.setFontMonofonto16().setFontAlign(-1, -1);

       h.drawString('LEFT SCROLL WHEEL: ' + state.leftWheel, 80, 145);
       h.drawString('RIGHT SCROLL WHEEL: ' + state.rightWheel, 80, 175);
       h.drawString('LEFT WHEEL PRESS: ' + state.leftWheelPress, 80, 205);

       h.flip();
       Pip.lastFlip = getTime();
     }

     function onLeftWheel(dir) {
       state.leftWheel += dir;
       mark(dir < 0 ? 'LEFT SCROLL WHEEL UP' : 'LEFT SCROLL WHEEL DOWN');
     }

     function onRightWheel(dir) {
       state.rightWheel += dir;
       mark(dir < 0 ? 'RIGHT SCROLL WHEEL UP' : 'RIGHT SCROLL WHEEL DOWN');
     }

     function onLeftWheelPress() {
       state.leftWheelPress++;
       mark('LEFT SCROLL WHEEL PRESS');
     }

     function start() {
       h.clear();
       Pip.audioStop();

       Pip.onExclusive('knob1', onLeftWheel);
       Pip.onExclusive('knob2', onRightWheel);

       if (typeof ENC1_PRESS !== 'undefined') {
         leftWheelPressWatch = setWatch(onLeftWheelPress, ENC1_PRESS, {
           repeat: true,
           edge: 'rising',
           debounce: 50,
         });
       }

       draw();
       redrawInterval = setInterval(draw, 1000);
     }

     function remove() {
       if (removed) return;
       removed = true;

       if (redrawInterval) clearInterval(redrawInterval);
       if (leftWheelPressWatch) clearWatch(leftWheelPressWatch);

       Pip.removeListener('knob1', onLeftWheel);
       Pip.removeListener('knob2', onRightWheel);

       Pip.audioStop();
       h.clear();
       h.flip();
     }

     start();

     return {
       id: APP_ID,
       notDefault: true,
       fullscreen: true,
       remove: remove,
     };
   });
   ```

   </details>

<p align="right">[ <a href="#index">Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## Development Workflow <a name="development"></a>

### Using Pip-Boy.com

<details>
<summary>Expand/Collapse</summary>

1. Open the Pip-Boy 3000 Holotape Creator/Editor:

   https://www.pip-boy.com/3000/holotapes/create

2. Create a new Holotape and give it a name.

3. Generate/edit/create your Holotape's code in the built in editor.

4. Test your Holotape on the device using the "Test on Device" button.

5. Download your files and add them to this repository.
</details>

### Using the Espruino Web IDE

You can use one of the two methods below to upload and test your Holotape:

<details>
<summary>Expand/Collapse</summary>

1. Open the Espruino Web IDE

   https://www.espruino.com/ide/

   or

   https://espruino.github.io/EspruinoWebIDE

2. Give a shoutout to Gordon Williams and the Espruino team!

   https://www.patreon.com/espruino

3. Open your file:

   ![img-open-file](.github/images/screenshots/open-file.png)

4. Enable **Watch File**

   ![img-watch-file](.github/images/screenshots/watch-file.png)

5. Edit the app in VS Code (or the web IDE's built in editor).

6. Enable "Settings" > "Minification" > "Esprima: Mangle"

7. Set "Settings" > "Minification" > "Pretokenise code before upload" to
   Yes/Always.

8. Upload to the device for testing.

> ![img-info][img-info] You can use a boot code file to boot straight into the
> app.

</details>

<p align="right">[ <a href="#index">Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## Images <a name="images"></a>

<details>
<summary>Expand/Collapse</summary>

Image data:

```js
// HOLO/MYAPP/IMG.JS
({
  block: atob('...'),
  nuke: atob('...'),
});
```

Load image data:

```js
const sprites = eval(require('fs').readFileSync('HOLO/MYAPP/IMG.JS'));
h.drawImage(sprites.nuke, 120, 80);
```

</details>

<p align="right">[ <a href="#index">Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## Input handling <a name="input"></a>

<details>
<summary>Expand/Collapse</summary>

Use `Pip.onExclusive()` when an app needs exclusive control input handling:

```js
function onKnob1(direction) {}
function onKnob2(direction) {}

Pip.onExclusive('knob1', onKnob1);
Pip.onExclusive('knob2', onKnob2);
```

Remove the listeners when the app exits:

```js
Pip.removeListener('knob1', onKnob1);
Pip.removeListener('knob2', onKnob2);
```

</details>

<p align="right">[ <a href="#index">Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## Memory and Performance <a name="memory"></a>

<details>
<summary>Expand/Collapse</summary>

Main rules:

- keep the app scoped:

  ```js
  (function () {
    // App code here
    // ...
    // Return this object
    return {
      id: 'APPID',
      notDefault: true,
      fullscreen: true,
      remove: function () { ... },
    };
  });
  ```

- Clean up in `remove()`, ie:
  ```js
  remove: function () {
    Pip.removeListener('knob1', onKnob1);
    clearInterval(intervalId);
    Pip.audioStop();
    h.clear();
  },
  ```

Notes:

- The 3000a has about `6500` Espruino variable blocks available to JavaScript.
- Once an app is running, the OS uses around `1700`, leaving about `4600` for
  the app.
- For example, Atomic Command was mentioned as using around `3000`.
- Avoid deleting OS globals or built in menus just to save memory. It may work,
  but it can also break returning to the Pip-Boy OS.

Useful memory checks:

```js
process.memory();
print(E.getSizeOf(this, 1).sort((a, b) => a.size - b.size));
print(E.getSizeOf(Pip, 1).sort((a, b) => a.size - b.size));
print(E.getSizeOf(this['\xFF'], 1).sort((a, b) => a.size - b.size));
```

`this['\xFF']` to see timers, watches, internal runtime state.

`Pip.CURRENT` can hold the current page or app code.

</details>

<p align="right">[ <a href="#index">Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## Contributing <a name="contributing"></a>

<details>
<summary>Expand/Collapse</summary>

1.  Fork the repository:

    https://github.com/CodyTolene/pip-boy-3000a-holotapes/fork

2.  Clone your forked repository:

    ```sh
    git clone https://github.com/<my-username>/pip-boy-3000a-holotapes.git
    ```

    > ![Info][img-info] Replace `<my-username>` with your own GitHub username.

3.  Create a new branch for your changes:

    ```sh
    git checkout -b your-feature-branch
    ```

4.  Make your changes to the codebase.

5.  Add and commit your changes:

    ```sh
    git add .
    git commit -m "Your commit message"
    ```

6.  Push your changes:

    ```sh
    git push origin your-feature-branch
    ```

7.  Before opening a pull request, give your Holotape one last cleanup pass:
    - Wrap the app in a function expression.
    - Return an object with `id` and `remove`.
    - Use `h` for graphics.
    - Avoid `var` and unnecessary globals.
    - Clean up everything in `remove()`:
      - listeners
      - timeouts
      - intervals
      - watches
      - audio
    - Keep sprites and images small.
    - Test that the app can exit without rebooting.
    - Test opening and closing the app more than once.
    - Check memory before and after exiting.
    - Document the controls and firmware version tested.

8.  Create a pull request on GitHub to merge your changes into the main branch:

        https://github.com/CodyTolene/pip-boy-3000a-holotapes/pulls

    </details>

<p align="right">[ <a href="#index">Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

## License(s) <a name="licenses"></a>

This project is licensed under the MIT License.

Some projects in this repository may have their own licenses. Check each app or
game's individual files and README for license terms that apply to that specific
project.

See the [LICENSE-MIT](LICENSE-MIT) file for more details.

`SPDX-License-Identifiers: MIT`

<p align="right">[ <a href="#index">Index</a> ]</p>

<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->
<!---------------------------------------------------------------------------->

<!-- IMAGE REFERENCES -->

[img-info]: .github/images/ng-icons/info.svg
[img-warn]: .github/images/ng-icons/warn.svg

<!-- LINK REFERENCES -->

[link-pip-boy]: https://pip-boy.com
