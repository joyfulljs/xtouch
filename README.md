# xtouch

With `XTouch`, you only need to handle `touch` event only, it will just works fine on both touch device and mouse device or device that support both.

# useage
```JS
import XTouch from "@joyfulljs/xtouch";

function onStart(e){};
function onMove(e){};
function onEnd(e){};

const capture = false

XTouch(div, { onStart, onMove, onEnd, capture });
```

# api

[docs](./index.d.ts)

# license

MIT
