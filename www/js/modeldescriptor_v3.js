
var modelDescriptorV3 = {
    //Objects

    FileReference: {
        referenceable: true,
        attributes: {
            name: {
                type: "string",
                defaultvalue: "referencename",
                required: true
            },
            file: {
                type: "string",
                defaultvalue: "filepath",
                required: true
            }
        }
    },
    Package: {
        referenceable: true,
        attributes: {
            name: {
                type: "string",
                defaultvalue: "packagename",
                required: true
            },
            identifier: {
                type: "string",
                defaultvalue: "identifier",
                required: true
            }
        }
    },
    SoundFileReference: {
        referenceable: true,
        attributes: {
            name: {
                type: "string",
                defaultvalue: "soundfilename",
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
    SpriteFileReference: {
        referenceable: true,
        attributes: {
            name: {
                type: "string",
                defaultvalue: "spritefilename",
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
                defaultvalue: "spritename",
                required: true
            },
            reference: {
                type: "reference",
                referencetype: "SpriteFileReference",
                required: true
            },
            x: {
                type: "number",
                defaultvalue: 0,
                required: true
            },
            y: {
                type: "number",
                defaultvalue: 0,
                required: true
            }
        }
    },
    SpritesGroup: {
        referenceable: true,
        attributes: {
            name: {
                type: "string",
                defaultvalue: "spritesgroupname",
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
                defaultvalue: "variablename",
                required: true
            },
            variabletype: {
                type: "ConditionalAttributesSet",
                attributesSets: {
                    string: {
                        stringvalue: {
                            type: "string",
                            defaultvalue: "value",
                            required: true
                        }
                    },
                    number: {
                        numbervalue: {
                            type: "number",
                            defaultvalue: 0,
                            required: true
                        }
                    },
                    boolean: {
                        stringvalue: {
                            type: "boolean",
                            defaultvalue: "false",
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
                defaultvalue: "conditionname",
                required: true
            },
            conditiontype: {
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
                stringvalue: {
                    type: "string",
                    defaultvalue: "value",
                    required: true
                }
            },
            number: {
                numbervalue: {
                    type: "number",
                    defaultvalue: 0,
                    required: true
                }
            },
            boolean: {
                booleanvalue: {
                    type: "boolean",
                    defaultvalue: "false",
                    required: true
                }
            }
        }
    }

};