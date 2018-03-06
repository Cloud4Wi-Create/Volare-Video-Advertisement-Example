# My Apps JavaScript SDK


## Including the Script in your Application

The SDK can be included with your application by including the following tag in your HTML document.
```
<script src="https://splashportal.sloud4wi.com/myapps/v1/myapps-sdk.js"></script>
```

Including the script in your application gives access to the `MYAPPS` object. This object encapsulates a handful of functions that allow your application to integrate itself into the Access Journey provided by Volare.

---
### goNext()

Moves the user away from the page to the next destination on the Access Journey.

Not available when application is opened from the App Bar as it is not a part of the Access Journey.

```javascript
MYAPPS.goNext();
```

---
### getNextUrl()

Returns the URL that points to the next destination on the Access Journey. It is the same URL that would be used by the `goNext()` function to continue the Journey.

Not available when application is opened from the App Bar as it is not a part of the Access Journey.

```javascript
MYAPPS.getNextUrl();
```

---
### goHome()

Moves the user away from the page to the Welcome Portal. In many cases, has the effect of going Next, but can also have the effect of going back. Useful for App Bar applications that can use it as a "back" button in lieu of not having access to the `goNext()` function.

```javascript
MYAPPS.goHome();
```

---
### end()

Combines `goNext()` and `goHome()`. If available, will behave as `goNext()`, but revert to `goHome()` otherwise. 

```javascript
MYAPPS.end();
```

---
### renderNavbar(navbarOptions)

Takes as an argument a JavaScript Object that contains options that are applied to the navigation bar. The options it supports are a delayed timer before the continue button is revealed, foreground and background color, and the text shown in the upper left corner.

```javascript
let navbarOptions = {
    apn: "Welcome",     // Label text for upper left
    fontColor: "white",       // Font Color
    backgroundColor: "black", // Background Color for gradient
    nextBtn: 10         // Number of seconds for delay timer
}
```

The options object does not have to be filled, as there are default options that can be relied upon. One simply has to ommit an entry in the object to revert to the default settings.

```javascript
MYAPPS.renderNavbar(navbarOptions);
```

The styling is hardcoded into the `nav` tag that is produced, so apart from JavaScript manipulation, custom styling is fairly limited.

---
### showNextBtn()

This function changes the style of the "next" button produced by the `renderNavbar` function from `hidden` to `inline-block`. 

```javascript
MYAPPS.showNextBtn();
```

---
### getSk()

Returns the session key necessary for the [context API call](JSON_structures.md). 

```javascript
MYAPPS.getSk();
```

---
### getParam(param)

Returns the value of the given argument `param` by parsing the URL. 

```javascript
MYAPPS.getParam(param);
```

Available parameters:
- `sk`: session key, used for the [context API call](JSON_structures.md)
- `tgr`: step of the Access Journey that called the App
    - `trOpn`: Connect
    - `trRgt`: Sign up
    - `trPlgn`: Log in Attempt
    - `trLgn`: Log in
    - `trLgt`: Disconnect
    - `false`: When not part of the Access Journey

---