
var modelDescriptorV3 = {
    //Objects

    FileReference: {
        referenceable: true,
        attributes: {
            name: {
                type: "string",
                required: true
            },
            file: {
                type: "string",
                required: true
            }
        }
    },
    Package: {
        referenceable: true,
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
        referenceable: true,
        attributes: {
            file: {
                type: "reference",
                referencetype: "FileReference",
                required: true
            },
            package: {
                type: "reference",
                referencetype: "Package",
                required: true
            }
        }
    },
    SpriteFileReference: {
        referenceable: true,
        attributes: {
            name: {
                type: "string",
                required: true
            },
            file: {
                type: "reference",
                referencetype: "FileReference",
                required: true
            },
            package: {
                type: "reference",
                referencetype: "Package",
                required: true
            }
        }
    },
    Sprite: {
        referenceable: true,
        attributes: {
            name: {
                type: "string",
                required: true
            },
            reference: {
                type: "reference",
                referencetype: "SpriteFileReference",
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
        referenceable: true,
        attributes: {
            name: {
                type: "string",
                required: true
            },
            sprites: {
                type: "collection",
                collectiontype: "reference",
                referencetype: "Sprite",
                required: true
            }
        }
    },
    Variable: {
        referenceable: true,
        attributes: {
            name: {
                type: "string",
                required: true
            },
            type: {
                type: "ConditionalAttributesSet",
                attributesSets: {
                    string: {
                        value: {
                            type: "string",
                            required: true
                        }
                    },
                    number: {
                        value: {
                            type: "number",
                            required: true
                        }
                    },
                    boolean: {
                        value: {
                            type: "boolean",
                            required: true
                        }
                    }
                }
            }
        }
    },
    Condition: {
        referenceable: true,
        attributes: {
            name: {
                type: "string",
                required: true
            },
            type: {
                type: "ConditionalAttributesSet",
                attributesSets: {
                    checkvariable: {
                        variable: {
                            type: "reference",
                            referencetype: "Variable",
                            required: true
                        },
                        operator: {
                            type: "include",
                            includetype: "ArithmeticOperator",
                            required: true
                        },
                        variabletype: {
                            type: "include",
                            includetype: "VariableValue",
                            required: true
                        }
                    },
                    othertemp: {
                    }
                }
            }
        }
    },
    // à partir d'ici, ce ne sont plus des objets complets

    ArithmeticOperator: {
        type: "Enumeration",
        enumerationvalues: ["===", "!==", "<", ">", "<=", ">="]
    },
    VariableValue: {
        type: "ConditionalAttributesSet",
        attributesSets: {
            string: {
                value: {
                    type: "string",
                    required: true
                }
            },
            number: {
                value: {
                    type: "number",
                    required: true
                }
            },
            boolean: {
                value: {
                    type: "boolean",
                    required: true
                }
            }
        }
    }

};