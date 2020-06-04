# xtouch

With `XTouch`, you only need to handle `touch` event only, it will just works fine on both touch device and mouse device or device that support both.

# useage

```JS
import XTouch from "@joyfulljs/xtouch";

function onStart(e){};
function onMove(e){};
function onEnd(e){};

const capture = false; // { passive: false }
const unbind = XTouch(div, { onStart, onMove, onEnd, capture });

// unbind();
```

# api

[docs](./index.d.ts)

# license

MIT@[elvinzhu](https://github.com/elvinzhu)
