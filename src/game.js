var gameOptions = {
    plugins: ['DamagePipeline', 'Primitives'],
    renderer: Kiwi.RENDERER_WEBGL,
    width: GameDimension.Width,
    height: GameDimension.Height
};

var game = new Kiwi.Game('content', 'myGame', null, gameOptions);