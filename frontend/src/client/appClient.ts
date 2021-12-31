import {defaultAppFactory} from "./getDefaultFactory";

const appClient = defaultAppFactory(window.location.origin)

export default appClient