<script>
  import rss from "$lib/icons/rss.svg"
  import home from "$lib/icons/cottage.svg"
</script>

<header>
  <a href="/" class="home"><h1>Simon would have said</h1></a>
  <div class="links">
    <a href="/" class="home">
      <img src={home} alt="Back to index"/>
    </a>
    <a href="/feed.xml">
      <img src={rss} alt="rss feed"/>
    </a>
    <a href="/whos-simon">
      Who's Simon?
    </a>
  </div>
</header>
<div class="body">
  <slot />
</div>

<style lang="scss">
  header {
    @media(max-width:610px) {
      &>.home {
        display: none;
      }
      .links .home {
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
    .links {
      font-size: 20px;
      font-weight: 600;
      margin-top: 10px;
      img {
        position: relative;
        top: 5px;
      }
      a {
        padding : 0 5px;
        border-right: 2px solid black;
        margin: 0;
        text-decoration: none;
        &:hover {
          border-bottom: 2px solid black;
          border-left: 2px solid black;
        }
        &:last-child {
          border-right: 0;
        }
      }
      .home {
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
