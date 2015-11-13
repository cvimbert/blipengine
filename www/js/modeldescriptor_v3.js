
var modelDescriptorV3 = {
    //Objects

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
            reference: {
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
                            type: "Variable",
                            usereference: true,
                            required: true
                        },
                        operator: {
                            type: "ArithmeticOperator",
                            required: true
                        },
                        variabletype: {
                            type: "VariableValue",
                            required: true
                        }
                    },
                    othertemp: {
                    }
                }
            }
        }
    },
    // other

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