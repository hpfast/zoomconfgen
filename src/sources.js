const resolutions = [3440.64, 1720.32, 860.16, 430.08, 215.04, 107.52, 53.76, 26.88, 13.44, 6.72, 3.36, 1.68, 0.84, 0.42, 0.21]

function maxRes(z) {
    if (z === 14) {
        return
    } else {
        return resolutions[z + 1]
    }
}

function generateSourceConfig(layer_config, conf) {
    let source_defs = {};
    layer_config.layers.forEach(layer => {
        layer_config.levels.forEach ( level => {
            let levellist = {};
            let name = layer.name + '_' + level + '_wms';
            let levels = level.split('_');
            if (levels.length == 2) {
                levellist = {
                    from: levels[0],
                    to: levels[1]
                }
            } else {
                levellist = {
                    from: levels[0],
                    to: levels[0]
                }
            }
            let source_def = generateTheSource(layer, levellist, conf)
            source_defs[name] = source_def;
        })
    })
    return source_defs;
}

function generateTheSource(layer, levellist, conf){
    let sourcename = layer.source_name ? layer.source_name : layer.name
    let source_def = {
        type: 'wms',
        supported_srs: layer.supported_srs || conf.srs,
        min_res: resolutions[(Number(levellist.from))],
        req: {
            url: '{{pdok.geoserver.url}}/'+ sourcename + '/wms?',
            layers: sourcename
        }
    }
    if (layer.transparent && layer.transparent === false) {
        source_def.image = {
            transparent: false
        };


    } else if (layer.transparent && layer.transparent === true) {
        source_def.req.transparent = true;
    }
    source_def.max_rex = maxRes(Number(levellist.to));
    return source_def;
}

module.exports = generateSourceConfig;
