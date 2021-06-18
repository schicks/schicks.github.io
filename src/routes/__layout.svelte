<script>
  import rss from "$lib/icons/rss.svg"
  import home from "$lib/icons/cottage.svg"
  import github from "$lib/icons/github.svg"
  import linkedin from "$lib/icons/linkedin.svg"
</script>

<header>
  <a href="/" class="big"><h1>Simon would have said</h1></a>
  <div class="links">
    <a href="/whos-simon" class="big">
      Who's Simon?
    </a>
    <a href="/" class="small">
      <img src={home} alt="Back to index"/>
    </a>
    <a href="https://github.com/schicks">
      <img src={github} alt="Github" style="height: 24px"/>
    </a>
    <a href="https://www.linkedin.com/in/sam-schick-868ab8ab/">
      <img src={linkedin} alt="Linkedin" style="height: 24px"/>
    </a>
    <a href="/feed.xml">
      <img src={rss} alt="rss feed"/>
    </a>
  </div>
</header>
<div class="body">
  <slot />
</div>

<style lang="scss">
  header {
    @media(max-width:680px) {
      .big {
        display: none;
      }
      .small {
        display: inline!important;
      }
    }
    border-bottom: 8px solid black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.45rem;
    min-height: 90px;
    margin-bottom: 1.45rem;
    a {
      text-decoration: none;
    }
    .links {
      font-size: 20px;
      font-weight: 600;
      margin-top: 10px;
      img {
        position: relative;
        top: 7px;
      }
      a {
        padding : 0 5px 5px 0;
        border-right: 2px solid black;
        margin: 0;
        &:hover {
          border-bottom: 2px solid black;
        }
        &:last-child {
          border-right: 0;
        }
      }
      .small {
        display: none;
      }
    }
  }
  .body {
    padding: 0 20px 20px 20px;
    max-width: 800px;
    margin: 0 auto;
  }
</style>
