var labelType, useGradients, nativeTextSupport, animate;

(function () {
  var ua = navigator.userAgent,
    iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
    typeOfCanvas = typeof HTMLCanvasElement,
    nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
    textSupport = nativeCanvasSupport
      && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff)) ? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function (text) {
    if (!this.elem)
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


function init() {
  //init Spacetree
  //Create a new ST instance
  var st = new $jit.ST({
    //id of viz container element
    injectInto: 'infovis',
    //set duration for the animation
    duration: 800,
    //set animation transition type
    transition: $jit.Trans.Quart.easeInOut,
    //set distance between node and its children
    levelDistance: 50,
    //enable panning
    Navigation: {
      enable: true,
      panning: true
    },
    //set node and edge styles
    //set overridable=true for styling individual
    //nodes or edges
    Node: {
      height: 20,
      width: 60,
      type: 'rectangle',
      color: '#aaa',
      overridable: true
    },

    Edge: {
      type: 'bezier',
      overridable: true
    },

    onBeforeCompute: function (node) {
      Log.write("loading " + node.name);
    },

    onAfterCompute: function () {
      Log.write("done");
    },

    //This method is called on DOM label creation.
    //Use this method to add event handlers and styles to
    //your node.
    onCreateLabel: function (label, node) {
      label.id = node.id;
      label.innerHTML = node.name;
      label.onclick = function () {
        if (normal.checked) {
          st.onClick(node.id);
        } else {
          st.setRoot(node.id, 'animate');
        }
      };
      //set label styles
      var style = label.style;
      style.width = 60 + 'px';
      style.height = 17 + 'px';
      style.cursor = 'pointer';
      style.color = '#333';
      style.fontSize = '0.8em';
      style.textAlign = 'center';
      style.paddingTop = '3px';
    },

    //This method is called right before plotting
    //a node. It's useful for changing an individual node
    //style properties before plotting it.
    //The data properties prefixed with a dollar
    //sign will override the global node style properties.
    onBeforePlotNode: function (node) {
      //add some color to the nodes in the path between the
      //root node and the selected node.
      if (node.selected) {
        node.data.$color = "#ff7";
      }
      else {
        delete node.data.$color;
        //if the node belongs to the last plotted level
        if (!node.anySubnode("exist")) {
          //count children number
          var count = 0;
          node.eachSubnode(function (n) { count++; });
          //assign a node color based on
          //how many children it has
          node.data.$color = ['#aaa', '#baa', '#caa', '#daa', '#eaa', '#faa'][count];
        }
      }
    },

    //This method is called right before plotting
    //an edge. It's useful for changing an individual edge
    //style properties before plotting it.
    //Edge data proprties prefixed with a dollar sign will
    //override the Edge global style properties.
    onBeforePlotLine: function (adj) {
      if (adj.nodeFrom.selected && adj.nodeTo.selected) {
        adj.data.$color = "#eed";
        adj.data.$lineWidth = 3;
      }
      else {
        delete adj.data.$color;
        delete adj.data.$lineWidth;
      }
    }
  });
  //load JSON data. 
  var json = {
    id: "node0",
    name: "Cidades",
    data: {},
    children: [
      {
        id: "node1",
        name: "Londrina",
        data: {},
        children: [
          {
            id: "node209",
            name: "2015",
            data: {},
            children: [
              {
                id: "node210",
                name: "01/01",
                data: {},
                children: [
                  {
                    id: "node211",
                    name: "15.8",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node212",
                name: "04/03",
                data: {},
                children: [
                  {
                    id: "node213",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node214",
                name: "04/05",
                data: {},
                children: [
                  {
                    id: "node215",
                    name: "10.8",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node216",
                name: "04/21",
                data: {},
                children: [
                  {
                    id: "node217",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node218",
                name: "05/01",
                data: {},
                children: [
                  {
                    id: "node219",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node220",
                name: "06/04",
                data: {},
                children: [
                  {
                    id: "nod221",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node222",
                name: "09/07",
                data: {},
                children: [
                  {
                    id: "node223",
                    name: "2.4",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node224",
                name: "10/12",
                data: {},
                children: [
                  {
                    id: "node225",
                    name: "33.8",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node226",
                name: "11/02",
                data: {},
                children: [
                  {
                    id: "node227",
                    name: "2",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node228",
                name: "11/15",
                data: {},
                children: [
                  {
                    id: "node229",
                    name: "15.2",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node230",
                name: "12/25",
                data: {},
                children: [
                  {
                    id: "node231",
                    name: "34.2",
                    data: {},
                    children: []
                  }
                ]
              }
            ]
          },
          {
            id: "node232",
            name: "2016",
            data: {},
            children: [
              {
                id: "node233",
                name: "01/01",
                data: {},
                children: [
                  {
                    id: "node234",
                    name: "11.2",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node235",
                name: "03/25",
                data: {},
                children: [
                  {
                    id: "node236",
                    name: "24",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node237",
                name: "03/27",
                data: {},
                children: [
                  {
                    id: "node238",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node239",
                name: "04/21",
                data: {},
                children: [
                  {
                    id: "node240",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node241",
                name: "05/01",
                data: {},
                children: [
                  {
                    id: "node242",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node243",
                name: "05/26",
                data: {},
                children: [
                  {
                    id: "node244",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node245",
                name: "09/07",
                data: {},
                children: [
                  {
                    id: "node246",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node245",
                name: "09/07",
                data: {},
                children: [
                  {
                    id: "node246",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node245",
                name: "09/07",
                data: {},
                children: [
                  {
                    id: "node246",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node247",
                name: "11/2",
                data: {},
                children: [
                  {
                    id: "node248",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node249",
                name: "11/15",
                data: {},
                children: [
                  {
                    id: "node250",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node251",
                name: "12/25",
                data: {},
                children: [
                  {
                    id: "node252",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              }
            ]
          },
          {
            id: "node253",
            name: "2017",
            data: {},
            children: [
              {
                id: "node254",
                name: "01/01",
                data: {},
                children: [
                  {
                    id: "node255",
                    name: "41.2",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node256",
                name: "04/14",
                data: {},
                children: [
                  {
                    id: "node257",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node258",
                name: "04/16",
                data: {},
                children: [
                  {
                    id: "node259",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node260",
                name: "04/21",
                data: {},
                children: [
                  {
                    id: "node261",
                    name: "47.4",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node262",
                name: "05/01",
                data: {},
                children: [
                  {
                    id: "node263",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node264",
                name: "06/15",
                data: {},
                children: [
                  {
                    id: "node265",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node266",
                name: "09/07",
                data: {},
                children: [
                  {
                    id: "node267",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node268",
                name: "10/12",
                data: {},
                children: [
                  {
                    id: "node269",
                    name: "3.2",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node270",
                name: "11/02",
                data: {},
                children: [
                  {
                    id: "node271",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node272",
                name: "11/15",
                data: {},
                children: [
                  {
                    id: "node273",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node274",
                name: "12/25",
                data: {},
                children: [
                  {
                    id: "node275",
                    name: "25.2",
                    data: {},
                    children: []
                  }
                ]
              }
            ]
          },
          {
            id: "node276",
            name: "2018",
            data: {},
            children: [
              {
                id: "node277",
                name: "01/01",
                data: {},
                children: [
                  {
                    id: "node278",
                    name: "1.8",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node279",
                name: "03/30",
                data: {},
                children: [
                  {
                    id: "node280",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node281",
                name: "04/01",
                data: {},
                children: [
                  {
                    id: "node282",
                    name: "2.4",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node283",
                name: "04/21",
                data: {},
                children: [
                  {
                    id: "node284",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node285",
                name: "05/01",
                data: {},
                children: [
                  {
                    id: "node286",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node287",
                name: "05/31",
                data: {},
                children: [
                  {
                    id: "node303",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node304",
                name: "09/07",
                data: {},
                children: [
                  {
                    id: "node288",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node289",
                name: "10/12",
                data: {},
                children: [
                  {
                    id: "node290",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node291",
                name: "11/02",
                data: {},
                children: [
                  {
                    id: "node292",
                    name: "15.4",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node293",
                name: "11/15",
                data: {},
                children: [
                  {
                    id: "node294",
                    name: "1",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node295",
                name: "12/25",
                data: {},
                children: [
                  {
                    id: "node296",
                    name: "4.4",
                    data: {},
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "node3",
        name: "Curitiba",
        data: {},
        children: [
          {
            id: "node120",
            name: "2015",
            data: {},
            children: [
              {
                id: "node121",
                name: "01/01",
                data: {},
                children: [
                  {
                    id: "node122",
                    name: "0.2",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node123",
                name: "04/03",
                data: {},
                children: [
                  {
                    id: "node124",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node125",
                name: "04/05",
                data: {},
                children: [
                  {
                    id: "node126",
                    name: "0.2",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node127",
                name: "04/21",
                data: {},
                children: [
                  {
                    id: "node128",
                    name: "7.1",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node129",
                name: "05/01",
                data: {},
                children: [
                  {
                    id: "node130",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node131",
                name: "06/04",
                data: {},
                children: [
                  {
                    id: "nod132",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node133",
                name: "09/07",
                data: {},
                children: [
                  {
                    id: "node134",
                    name: "0.3",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node135",
                name: "10/12",
                data: {},
                children: [
                  {
                    id: "node136",
                    name: "26.3",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node137",
                name: "11/02",
                data: {},
                children: [
                  {
                    id: "node138",
                    name: "1.8",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node139",
                name: "11/15",
                data: {},
                children: [
                  {
                    id: "node140",
                    name: "0.5",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node141",
                name: "12/25",
                data: {},
                children: [
                  {
                    id: "node142",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              }
            ]
          },
          {
            id: "node143",
            name: "2016",
            data: {},
            children: [
              {
                id: "node144",
                name: "01/01",
                data: {},
                children: [
                  {
                    id: "node145",
                    name: "0.4",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node146",
                name: "03/25",
                data: {},
                children: [
                  {
                    id: "node147",
                    name: "5",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node148",
                name: "03/27",
                data: {},
                children: [
                  {
                    id: "node149",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node150",
                name: "04/21",
                data: {},
                children: [
                  {
                    id: "node151",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node152",
                name: "05/01",
                data: {},
                children: [
                  {
                    id: "node153",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node154",
                name: "05/26",
                data: {},
                children: [
                  {
                    id: "node155",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node156",
                name: "09/07",
                data: {},
                children: [
                  {
                    id: "node157",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node158",
                name: "10/12",
                data: {},
                children: [
                  {
                    id: "node159",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node160",
                name: "11/2",
                data: {},
                children: [
                  {
                    id: "node161",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node162",
                name: "11/15",
                data: {},
                children: [
                  {
                    id: "node163",
                    name: "0.6",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node164",
                name: "12/25",
                data: {},
                children: [
                  {
                    id: "node165",
                    name: "2.5",
                    data: {},
                    children: []
                  }
                ]
              }
            ]
          },
          {
            id: "node166",
            name: "2017",
            data: {},
            children: [
              {
                id: "node167",
                name: "01/01",
                data: {},
                children: [
                  {
                    id: "node168",
                    name: "0.2",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node169",
                name: "04/14",
                data: {},
                children: [
                  {
                    id: "node170",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node171",
                name: "04/21",
                data: {},
                children: [
                  {
                    id: "node172",
                    name: "7.2",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node173",
                name: "05/01",
                data: {},
                children: [
                  {
                    id: "node301",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node174",
                name: "06/15",
                data: {},
                children: [
                  {
                    id: "node175",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node176",
                name: "09/07",
                data: {},
                children: [
                  {
                    id: "node177",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node178",
                name: "10/12",
                data: {},
                children: [
                  {
                    id: "node179",
                    name: "44.5",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node180",
                name: "11/02",
                data: {},
                children: [
                  {
                    id: "node181",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node182",
                name: "11/15",
                data: {},
                children: [
                  {
                    id: "node183",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node184",
                name: "12/25",
                data: {},
                children: [
                  {
                    id: "node185",
                    name: "39.6",
                    data: {},
                    children: []
                  }
                ]
              }
            ]
          },
          {
            id: "node186",
            name: "2018",
            data: {},
            children: [
              {
                id: "node187",
                name: "01/01",
                data: {},
                children: [
                  {
                    id: "node188",
                    name: "26.5",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node189",
                name: "03/30",
                data: {},
                children: [
                  {
                    id: "node190",
                    name: "22.2",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node191",
                name: "04/01",
                data: {},
                children: [
                  {
                    id: "node192",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node193",
                name: "04/21",
                data: {},
                children: [
                  {
                    id: "node194",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node195",
                name: "05/01",
                data: {},
                children: [
                  {
                    id: "node196",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node197",
                name: "05/31",
                data: {},
                children: [
                  {
                    id: "node198",
                    name: "0.1",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node199",
                name: "09/07",
                data: {},
                children: [
                  {
                    id: "node200",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node201",
                name: "10/12",
                data: {},
                children: [
                  {
                    id: "node202",
                    name: "2.2",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node203",
                name: "11/02",
                data: {},
                children: [
                  {
                    id: "node204",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node205",
                name: "11/15",
                data: {},
                children: [
                  {
                    id: "node206",
                    name: "7.3",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node207",
                name: "12/25",
                data: {},
                children: [
                  {
                    id: "node208",
                    name: "1.5",
                    data: {},
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "node4",
        name: "Castro",
        data: {},
        children: [
          {
            id: "node48",
            name: "2015",
            data: {},
            children: [
              {
                id: "node49",
                name: "01/01",
                data: {},
                children: [
                  {
                    id: "node50",
                    name: "4.6",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node51",
                name: "04/03",
                data: {},
                children: [
                  {
                    id: "node52",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node53",
                name: "04/05",
                data: {},
                children: [
                  {
                    id: "node54",
                    name: "0.2",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node55",
                name: "04/21",
                data: {},
                children: [
                  {
                    id: "node56",
                    name: "6.8",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node57",
                name: "05/01",
                data: {},
                children: [
                  {
                    id: "node58",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node59",
                name: "06/04",
                data: {},
                children: [
                  {
                    id: "node60",
                    name: "0.3",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node61",
                name: "09/07",
                data: {},
                children: [
                  {
                    id: "node62",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node63",
                name: "10/12",
                data: {},
                children: [
                  {
                    id: "node64",
                    name: "64.7",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node65",
                name: "11/02",
                data: {},
                children: [
                  {
                    id: "node66",
                    name: "4.4",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node67",
                name: "11/15",
                data: {},
                children: [
                  {
                    id: "node68",
                    name: "5",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node69",
                name: "12/25",
                data: {},
                children: [
                  {
                    id: "node70",
                    name: "1.5",
                    data: {},
                    children: []
                  }
                ]
              }
            ]
          },
          {
            id: "node71",
            name: "2016",
            data: {},
            children: [
              {
                id: "node72",
                name: "01/01",
                data: {},
                children: [
                  {
                    id: "node73",
                    name: "0.3",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node74",
                name: "03/25",
                data: {},
                children: [
                  {
                    id: "node75",
                    name: "17",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node76",
                name: "04/21",
                data: {},
                children: [
                  {
                    id: "node77",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node78",
                name: "04/21",
                data: {},
                children: [
                  {
                    id: "node79",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node80",
                name: "05/26",
                data: {},
                children: [
                  {
                    id: "node81",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node82",
                name: "09/07",
                data: {},
                children: [
                  {
                    id: "node83",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node84",
                name: "10/12",
                data: {},
                children: [
                  {
                    id: "node85",
                    name: "0.3",
                    data: {},
                    children: []
                  }
                ]
              }
            ]
          },
          {
            id: "node86",
            name: "2017",
            data: {},
            children: [
              {
                id: "node87",
                name: "04/14",
                data: {},
                children: [
                  {
                    id: "node88",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node89",
                name: "04/21",
                data: {},
                children: [
                  {
                    id: "node90",
                    name: "15.4",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node91",
                name: "05/01",
                data: {},
                children: [
                  {
                    id: "node92",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node93",
                name: "06/15",
                data: {},
                children: [
                  {
                    id: "node94",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node95",
                name: "09/07",
                data: {},
                children: [
                  {
                    id: "node96",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node97",
                name: "10/12",
                data: {},
                children: [
                  {
                    id: "node98",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node99",
                name: "11/02",
                data: {},
                children: [
                  {
                    id: "node100",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node101",
                name: "11/15",
                data: {},
                children: [
                  {
                    id: "node102",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              }
            ]
          },
          {
            id: "node103",
            name: "2018",
            data: {},
            children: [
              {
                id: "node104",
                name: "03/30",
                data: {},
                children: [
                  {
                    id: "node105",
                    name: "0.8",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node106",
                name: "04/21",
                data: {},
                children: [
                  {
                    id: "node107",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node108",
                name: "05/01",
                data: {},
                children: [
                  {
                    id: "node109",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node110",
                name: "05/31",
                data: {},
                children: [
                  {
                    id: "node111",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node112",
                name: "09/07",
                data: {},
                children: [
                  {
                    id: "node113",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node114",
                name: "11/02",
                data: {},
                children: [
                  {
                    id: "node115",
                    name: "1",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node116",
                name: "11/15",
                data: {},
                children: [
                  {
                    id: "node117",
                    name: "0.8",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node118",
                name: "12/25",
                data: {},
                children: [
                  {
                    id: "node119",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "node5",
        name: "C. Moural",
        data: {},
        children: [
          {
            id: "node6",
            name: "2015",
            data: {},
            children: [
              {
                id: "node7",
                name: "01/01",
                data: {},
                children: [
                  {
                    id: "node8",
                    name: "32.8",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node9",
                name: "04/03",
                data: {},
                children: [
                  {
                    id: "node10",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node11",
                name: "04/05",
                data: {},
                children: [
                  {
                    id: "node12",
                    name: "7.5",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node13",
                name: "04/21",
                data: {},
                children: [
                  {
                    id: "node14",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node15",
                name: "05/01",
                data: {},
                children: [
                  {
                    id: "node16",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node17",
                name: "06/04",
                data: {},
                children: [
                  {
                    id: "node18",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node19",
                name: "09/07",
                data: {},
                children: [
                  {
                    id: "node20",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node21",
                name: "10/12",
                data: {},
                children: [
                  {
                    id: "node22",
                    name: "40.3",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node23",
                name: "11/02",
                data: {},
                children: [
                  {
                    id: "node24",
                    name: "18.4",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node25",
                name: "11/15",
                data: {},
                children: [
                  {
                    id: "node26",
                    name: "3.3",
                    data: {},
                    children: []
                  }
                ]
              }
            ]
          },
          {
            id: "node27",
            name: "2016",
            data: {},
            children: [
              {
                id: "node28",
                name: "01/01",
                data: {},
                children: [
                  {
                    id: "node29",
                    name: "2.5",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node30",
                name: "03/25",
                data: {},
                children: [
                  {
                    id: "node31",
                    name: "30.3",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node32",
                name: "03/27",
                data: {},
                children: [
                  {
                    id: "node33",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node34",
                name: "04/21",
                data: {},
                children: [
                  {
                    id: "node35",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node36",
                name: "05/01",
                data: {},
                children: [
                  {
                    id: "node37",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node38",
                name: "05/26",
                data: {},
                children: [
                  {
                    id: "node39",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node40",
                name: "09/07",
                data: {},
                children: [
                  {
                    id: "node41",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node42",
                name: "10/12",
                data: {},
                children: [
                  {
                    id: "node43",
                    name: "4",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node44",
                name: "10/02",
                data: {},
                children: [
                  {
                    id: "node45",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              },
              {
                id: "node46",
                name: "11/15",
                data: {},
                children: [
                  {
                    id: "node47",
                    name: "0",
                    data: {},
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
  st.loadJSON(json);
  //end  
  //compute node positions and layout
  st.compute();
  //optional: make a translation of the tree
  st.geom.translate(new $jit.Complex(-200, 0), "current");
  //emulate a click on the root node.
  st.onClick(st.root);
  //end
  //Add event handlers to switch spacetree orientation.
  var top = $jit.id('r-top'),
    left = $jit.id('r-left'),
    bottom = $jit.id('r-bottom'),
    right = $jit.id('r-right'),
    normal = $jit.id('s-normal');


  function changeHandler() {
    if (this.checked) {
      top.disabled = bottom.disabled = right.disabled = left.disabled = true;
      st.switchPosition(this.value, "animate", {
        onComplete: function () {
          top.disabled = bottom.disabled = right.disabled = left.disabled = false;
        }
      });
    }
  };

  top.onchange = left.onchange = bottom.onchange = right.onchange = changeHandler;
  //end

}
