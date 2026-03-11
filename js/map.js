window.initSeaPlotsMap = function () {
  const mapEl = document.getElementById("map");
  if (!mapEl) return;

  const map = L.map("map", {
    zoomControl: true,
    scrollWheelZoom: true
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap"
  }).addTo(map);

  const plots = [
    {
      name: "320 соток",
      href: "plot-320.html",
      coords: [
        [45.23085278, 33.11580556],
        [45.23195278, 33.11410556],
        [45.23161944, 33.11373611],
        [45.23188056, 33.11332500],
        [45.23220278, 33.11366944],
        [45.23260556, 33.11303056],
        [45.23335556, 33.11382778],
        [45.23151389, 33.11666111]
      ]
    },
    {
      name: "220 соток",
      href: "plot-220.html",
      coords: [
        [45.23335556, 33.11382778],
        [45.23260556, 33.11303056],
        [45.23335000, 33.11187778],
        [45.23409444, 33.11266944]
      ]
    },
    {
      name: "140 соток",
      href: "plot-140.html",
      coords: [
        [45.23409444, 33.11266944],
        [45.23335000, 33.11187778],
        [45.23395278, 33.11093611],
        [45.23471389, 33.11174444]
      ]
    },
    {
      name: "6–7 соток",
      href: "plots-6-7.html",
      coords: [
        [45.22978056, 33.11753056],
        [45.23085278, 33.11580556],
        [45.23151389, 33.11666111],
        [45.23045833, 33.11829167]
      ]
    },
    {
      name: "9 соток",
      href: "plot-9.html",
      coords: [
        [45.22933056, 33.11815000],
        [45.22978056, 33.11753056],
        [45.23045833, 33.11829167],
        [45.22998611, 33.11893056]
      ]
    }
  ];

  const defaultStyle = {
    color: "#102430",
    weight: 2,
    fillColor: "#d8c39b",
    fillOpacity: 0.28
  };

  const hoverStyle = {
    color: "#102430",
    weight: 3,
    fillColor: "#d8c39b",
    fillOpacity: 0.48
  };

  const allLayers = [];

  plots.forEach((plot) => {
    const polygon = L.polygon(plot.coords, defaultStyle).addTo(map);

    polygon.bindTooltip(plot.name, {
      permanent: false,
      direction: "center",
      className: "plot-tooltip"
    });

    polygon.on("mouseover", () => {
      polygon.setStyle(hoverStyle);
    });

    polygon.on("mouseout", () => {
      polygon.setStyle(defaultStyle);
    });

    polygon.on("click", () => {
      window.location.href = plot.href;
    });

    allLayers.push(polygon);
  });

  const group = L.featureGroup(allLayers);
  map.fitBounds(group.getBounds(), {
    padding: [30, 30]
  });
};
