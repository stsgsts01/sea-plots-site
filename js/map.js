window.initSeaPlotsMap = function () {
  const mapEl = document.getElementById("map");
  if (!mapEl) return;

  const map = L.map("map", {
  zoomControl: true,
  scrollWheelZoom: false
});

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap"
  }).addTo(map);

  function makePlot(coords, label, href, color = "red") {
    const poly = L.polygon(coords, {
      color: color,
      weight: 3,
      fillColor: "yellow",
      fillOpacity: 0.45
    }).addTo(map);

    poly.bindTooltip(label, {
      permanent: true,
      direction: "center",
      className: "zoom-label",
      offset: [0, 0],
      interactive: false
    });

    poly.on("mouseover", function () {
      poly.setStyle({
        weight: 4,
        fillOpacity: 0.60
      });
    });

    poly.on("mouseout", function () {
      poly.setStyle({
        weight: 3,
        fillOpacity: 0.45
      });
    });

    poly.on("click", function () {
      window.location.href = href;
    });

    return poly;
  }

  const p320 = makePlot([
    [45.23085278,33.11580556],[45.23195278,33.11410556],[45.23161944,33.11373611],[45.23188056,33.11332500],
    [45.23220278,33.11366944],[45.23260556,33.11303056],[45.23335556,33.11382778],[45.23151389,33.11666111]
  ], "320 соток", "plot-320.html");

  const p220 = makePlot([
    [45.22615556,33.13086111],[45.22684444,33.12986944],[45.22571667,33.12814722],[45.22506389,33.12930000]
  ], "220 соток", "plot-220.html");

  const p140 = makePlot([
    [45.23142778,33.11681111],[45.23091389,33.11759444],[45.23201667,33.11906111],[45.23251111,33.11831944]
  ], "140 соток", "plot-140.html");

  const p67 = makePlot([
    [45.24486667,33.12538333],[45.24665833,33.12366111],[45.24623333,33.12284722],[45.24445000,33.12457778]
  ], "6–7 соток", "plots-6-7.html");

  const p9 = makePlot([
    [45.21951667,33.14992778],[45.21948056,33.15043611],[45.21965833,33.15045000],[45.21969722,33.14993889]
  ], "9 соток ИЖС", "plot-9.html");

  const allPolys = [p320, p220, p140, p67, p9];

  function updateLabels() {
    const z = map.getZoom();
    allPolys.forEach(poly => {
      if (z >= 15) poly.openTooltip();
      else poly.closeTooltip();
    });
  }

   const group = L.featureGroup([p320, p220, p140, p67, p9]);

  map.fitBounds(group.getBounds(), {
    padding: [35, 35]
  });

  map.on("zoomend", updateLabels);
  map.whenReady(updateLabels);
};
