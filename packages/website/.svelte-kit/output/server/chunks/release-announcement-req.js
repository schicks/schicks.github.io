import { c as create_ssr_component, v as validate_component } from "./index.js";
import { B as Blog } from "./blog.js";
const metadata = {
  "title": "Req: Postman in the terminal",
  "date": "2022-06-16T15:34:32.000Z",
  "status": "published",
  "blurb": "Postman is great, but we could do better."
};
const Release_announcement_req = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Blog, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign({}, $$props, metadata), {}, {
    default: () => {
      return `<p>I use <a href="https://www.postman.com/downloads/" rel="nofollow">Postman</a> a lot at work. It’s really helpful to have an interface where I can write down a request, run it, and then iterate on it based on the response. However, the fact that it’s a GUI tool puts some real limitations on it. </p>
<p>Between VS Code, zoom, docker, firefox, and slack, I’m often already pushing my computer a little harder than it’s happy place, and adding another electron application isn’t ideal. Worse than that, trying to eyeball my way through a 500 line JSON response is no fun at all. </p>
<p>I’d much rather have a CLI tool where I can pipe the results into <a href="https://stedolan.github.io/jq/" rel="nofollow">jq</a> and explore to my hearts content in a more focused way. For a while I tried just using <code>curl</code>, but that had a different set of problems. Editing requests in Postman feels like iterating on code. I have a static document representing the request that can be saved between sessions, pull secrets from the environment (sort of), and have meaningful structure related to what I’m building. Iterating on a curl request just feels bad, especially when I need to send a request with a body.</p>
<p>I spent a while complaining to my coworkers that curl wouldn’t run HTTP requests from a file, and after I got all the whinging out of my system I realized that this should be a relatively easy thing to build. I wanted something that could</p>
<ul><li>run as a CLI application</li>
<li>read requests in a standard format from a static file</li>
<li>be distributed as a static binary (none of this <a href="https://httpyac.github.io/" rel="nofollow">install from npm</a> nonsense)</li></ul>
<p>So I wrote <a href="https://github.com/schicks/req/releases/tag/v1.0.0" rel="nofollow">req</a>. Req takes in a file containing a <a href="https://www.w3.org/Protocols/rfc2616/rfc2616-sec5.html" rel="nofollow">spec compliant</a> HTTP request, performs that request, and returns the response body to stdout. By default it <em>only</em> returns the body, making it simple to pipe into other tools, but on a flag it can return other metadata as well.</p>
<p>I get that the world probably didn’t need another HTTP client, but it was fun to have a project to work in a language that I don’t get to work in every day that filled a real gap in the way I work. Often I struggle to stick with projects because the goal feels kind of abstract. It was very nice to have something that I am already using regularly to test and debug HTTP apps.</p>`;
    }
  })}`;
});
export {
  Release_announcement_req as default,
  metadata
};
