function generateSeedConfig(layer_config) {
    let seed_defs = {};
    layer_config.layers.forEach(layer => {
        layer_config.levels.forEach ( level => {
            let name = layer.name + '_' + level;
            let levellist = {};
            let levels = level.split('_');
            if (levels.length === 2) {
                levellist = {
                    from: levels[0],
                    to: levels[1]
                };
            } else {
                levellist = [levels[0]];
            }
            let seed_def = {
                caches: [name + '_cache'],
                coverages: ['netherlands'],
                grids: ['EPSG:28992'],
                levels: levellist

            }
            seed_defs[name] = seed_def;

        })
    })
    return seed_defs;
}

module.exports = generateSeedConfig;

