function generateLayerConfig(layer_config) {
    let layer_defs = [];
    layer_config.layers.forEach( layer => {
        let layer_def = {
            name: layer.pubname || layer.name,
            title: layer.pubtitle || layer.name,
            sources: [layer.name + '_combined']
        }
        layer_defs.push(layer_def)
    })
    return layer_defs;
}

module.exports = generateLayerConfig;
