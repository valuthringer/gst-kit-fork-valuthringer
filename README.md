# Gstreamer Kit - Prebuild (forked by @valuthringer)

**Note:** This repository is a fork that produces prebuilt native binaries (prebuilds) for common platforms so consumers don't need to install Visual Studio Build Tools, Chocolatey, or compile the native addon locally. To use the prebuilt package from your project, add the release tarball URL as the dependency and run a normal install:

```json
"dependencies": {
  "gst-kit": "https://github.com/valuthringer/gst-kit-fork-valuthringer/releases/download/v0.2.4-val.3/gst-kit-0.2.4-val.3.tgz"
}
```

Then run:

```bash
npm install
```

This will install the packaged module containing prebuilt native bindings — you only need to ensure the GStreamer runtime is installed on the target machine (the prebuilds remove the need for native build tools).