//going to assume a standard mapping of image format
function deduceImageFormats(layer) {
    let request_format = 'image/png';
    let image_format = 'png24';
    if (/_jpeg$/.test(layer)) {
        request_format = 'image/jpeg';
        image_format = 'image/jpeg';
    }
    return( {image_format: image_format, request_format: request_format});
}

function sourcename(name) {
    let r = /_(jpeg|png)$/;
    let newname = name.replace(r, '');
    return newname;
}

function generateCacheConfig(layer_config) {
    let cache_defs = {};
    layer_config.layers.forEach( layer => {
        let {image_format, request_format} = deduceImageFormats(layer.name);
        let subcaches = [];    
        layer_config.levels.forEach(level => {
            let name = `${layer.name}_${level}_cache`;            
            subcaches.push(name);
            let cache_def = {
                'sources': [ sourcename(layer.name) + '_' + level +'_wms'],
                'grids': ['EPSG:28992'],
                'format': image_format,
                'request_format': request_format,
                'cache': {
                    'type': 'couchdb',
                    'url': '{{pdok.couchdb.url}}',
                    'db_name': name,
                    'tile_metadata': {
                        'tile_col': '{{x}}',
                        'tile_row': '{{y}}',
                        'tile_level': '{{z}}',
                        'created_ts': '{{timestamp}}',
                        'created': '{{utc_iso}}',
                        'center': '{{wgs_tile_centroid}}'
                    }
                }
            };
            if (/_jpeg$/.test(layer.name)) {
                cache_def['image'] = {   
                    'encoding_options': {
                        'jpeg_quality': 100
                    }
                };
            }
            cache_defs[name] = cache_def;

        })
        cache_defs[layer.name+'_combined'] = {
            'sources': subcaches,
            'grids': ['EPSG:28992'],
            'request_format': request_format,
            'format': image_format
        }

    })
    return cache_defs;
}

module.exports = generateCacheConfig;
