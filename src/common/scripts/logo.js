
window.LinnikovLOGO = {

    // SVG file url
    url: "../wp-content/themes/linnikov-agency/img/rgb-logo.svg",

    // timer in ms, letters animation effect
    timerStep: 50,

    wrapElem: "g#LINNIKOV_agency",
    L1: ["L", "I-2", "N_1", "N_2", "I", "K", "O", "V"],

    // init
    init: (rootSelector) => {
        LinnikovLOGO.rootSelector = rootSelector;
        LinnikovLOGO.preload();
    },

    // bind hover events
    bind: () => {

        $(LinnikovLOGO.wrapElem + ' > g').each(function() {

            let bb = this.getBBox();

            let w = Math.round(bb.width),
            h = Math.round(bb.height),
            x = Math.round(bb.x),
            y = Math.round(bb.y);

            let newRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

            newRect.setAttribute("x", x);
            newRect.setAttribute("y", y);
            newRect.setAttribute("width", w);
            newRect.setAttribute("height", h);
            newRect.setAttribute("fill", "rgba(255,0,0,0)");
            newRect.setAttribute("class", "hoverEvt");

            this.appendChild(newRect);

        });

        $(LinnikovLOGO.wrapElem + ' > g').on("mouseover", function(e) {

            let t = e.target;
            if ($(t).parent().is("*[data-name]")) { t = $(t).parent(); }

            if ($(t).is("*[data-name]")) {

                let name = $(t).attr("data-name");

                if (name) {

                    name = 'g#' + name;

                    if ($(name).is(".hoverOut")) {

                        $(name).removeClass("hoverOut").css("display", "none");

                    } else {

                        $(name).addClass("hovered").css("display", "block");

                    }

                }

            }

        });

        $(LinnikovLOGO.wrapElem).on("mouseout", function(e) {

            let t = e.target;
            if ($(t).parent().is("*[data-name]")) { t = $(t).parent(); }

            if ($(t).is("*[data-name]")) {

                let name = $(t).attr("data-name");

                if (name) {

                    name = 'g#' + name;

                    if ($(name).is(".hovered")) {

                        $(name).removeClass("hovered").addClass("hoverOut");

                    }

                }

            }

        });

    },

    //svg preloading from file
    preload: () => {

        fetch(LinnikovLOGO.url)
        .then(response => response.text())
        .then(LinnikovLOGO.svgReady);

    },

    // on svg ready, append it to DOM
    svgReady: (svg) => {

        LinnikovLOGO.svgData = svg;
        $(LinnikovLOGO.rootSelector).html(svg);

        LinnikovLOGO.bind();
        
        // onload animation
        setTimeout(function() {
            LinnikovLOGO.animate();
        }, 500);
            

    },

    // clear all RGB effects
    clear: () => {

        for(let lN=0; lN<=LinnikovLOGO.L1.length-1; lN++) {

            let name = 'g#' + LinnikovLOGO.L1[lN];
            $(name).css("display", "none");

        }

        $("g").filter(".hovered, .hoverOut").removeClass("hovered hoverOut");

    },

    // run full animation
    animate: () => {
            
        LinnikovLOGO.clear();

        let timer = 0,
        timerStep = 50;

        LinnikovLOGO.L1.forEach(function(g, i) {

            setTimeout(() => { $('g#' + g).css("display", "block"); }, timer);
            timer+= LinnikovLOGO.timerStep;

            if (i == (LinnikovLOGO.L1.length-1)) {

                setTimeout(() => { LinnikovLOGO.animateBack(); }, 1000);

            } 

        });

    },

    animateBack: () => {

        let timer = 0,
        timerStep = 50;

        LinnikovLOGO.L1.reverse().forEach(function(g, i) {

            setTimeout(() => { $('g#' + g).css("display", "none"); }, timer);
            timer+= LinnikovLOGO.timerStep;

        });

    }

}