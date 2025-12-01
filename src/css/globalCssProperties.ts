export function registerGlobalCssProperties(){
    if ((CSS as any).registerProperty) {
	(CSS as any).registerProperty({
	    name: "--upGradient",
	    syntax: "<percentage>",
	    inherits: false,
	    initialValue: "0%"
	});
	 (CSS as any).registerProperty({
	    name: "--downGradient",
	    syntax: "<percentage>",
	    inherits: false,
	    initialValue: "100%"
	});
    }
}



