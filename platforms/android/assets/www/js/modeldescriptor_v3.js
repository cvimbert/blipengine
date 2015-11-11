
var modelDescriptorV3 = {
    FileReference: {
        attributes: {
            file: {
                type: "string",
                required: true
            }
        }
    },
    Package: {
        attributes: {
            name: {
                type: "string",
                required: true
            },
            identifier: {
                type: "string",
                required: true
            }
        }
    },
    SoundFileReference: {
        attributes: {
            file: {
                type: "FileReference",
                usereference: true,
                required: true
            },
            package: {
                type: "Package",
                usereference: true,
                required: true
            }
        }
    },
    SpriteFileReference: {
        attributes: {
            file: {
                type: "FileReference",
                usereference: true,
                required: true
            },
            package: {
                type: "Package",
                usereference: true,
                required: true
            }
        }
    },
    Sprite: {
        attributes: {
            name: {
                type: "string",
                required: true
            },
            reference:{
                type: "SpriteFileReference",
                usereference: true,
                required: true
            },
            x: {
                type: "number",
                required: true
            },
            y: {
                type: "number",
                required: true
            }
        }
    },
    SpritesGroup: {
        attributes: {
            name: {
                type: "string",
                required: true
            },
            sprites: {
                type: "Collection",
                collectiontype: "Sprite",
                usereference: true,
                required: true
            }
        }
    },
    Variable: {
        attributes: {
            name: {
                type: "string",
                required: true
            },
            type: {
                string: {
                    value: "string",
                    required: true
                },
                number: {
                    value: "number",
                    required: true
                },
                boolean: {
                    value: "boolean",
                    required: true
                }
            }
        }
    },
    Condition: {
        attributes: {
            name: {
                type: "string",
                required: true
            },
            
        }
    }
};