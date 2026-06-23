(function(){
  function slugFromPath(){var p=location.pathname.replace(/\/+$/,"").split("/");var l=p[p.length-1];if(l==="grn-links"||l==="")return"";if(/\.html?$/.test(l))return"";return decodeURIComponent(l);}
  var qs=new URLSearchParams(location.search),slug=qs.get("s")||slugFromPath();
  var base=location.pathname.indexOf("/grn-links/")===0?"/grn-links/":"/";
  fetch(base+"redirects.json",{cache:"no-store"}).then(function(r){return r.json();}).then(function(m){
    var links=(m&&m.links)||[];
    if(slug){var e=links.filter(function(x){return x.slug===slug;})[0];if(e&&e.current_url){location.replace(e.current_url);return;}render(links,"Unknown or not-yet-set link: <b>"+slug+"</b>");return;}
    render(links,null);
  }).catch(function(){document.body.innerHTML="<p>grn-links: registry unavailable</p>";});
  function render(links,msg){var rows=links.map(function(x){var live=x.current_url?'<a href="'+base+x.slug+'">'+x.slug+'</a>':x.slug+' <i>(unset)</i>';return"<li>"+live+" — "+(x.what||"")+"</li>";}).join("");document.body.innerHTML="<h2>grn-links</h2>"+(msg?"<p>"+msg+"</p>":"")+"<ul>"+rows+"</ul><p style='color:#888'>GRN common links · owner grn_owner</p>";}
})();
