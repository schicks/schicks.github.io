export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".nojekyll","duckduckgo-infinity.png","favicon.png","global.css"]),
	mimeTypes: {".png":"image/png",".css":"text/css"},
	_: {
		entry: {"file":"_app/immutable/start-a6505234.js","imports":["_app/immutable/start-a6505234.js","_app/immutable/chunks/index-58f43e7f.js","_app/immutable/chunks/singletons-380e795b.js","_app/immutable/chunks/preload-helper-a4192956.js","_app/immutable/chunks/control-f5b05b5f.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js')
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
