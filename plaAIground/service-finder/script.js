
const decisionTree =
{
    "question": "Hledáte podporu pro sebe nebo pro někoho jiného?",
    "options": {
        "for myself": {
            "question": "Čelíte okamžité krizi nebo hledáte trvalou podporu?",
            "options": {
                "immediate crisis": {
                    "question": "Jedná se o život ohrožující stav nouze?",
                    "options": {
                        "yes": {
                            "services": [
                                "zdravotnická záchranná služba",
                                "urgentní medicína"
                            ]
                        },
                        "no": {
                            "question": "Co nejlépe vystihuje vaši současnou situaci?",
                            "options": {
                                "mental health crisis": {
                                    "question": "Máte myšlenky na to, že ublížíte sobě nebo druhým?",
                                    "options": {
                                        "yes": {
                                            "services": [
                                                "krizová pomoc",
                                                "psychiatrie",
                                                "urgentní medicína"
                                            ]
                                        },
                                        "no": {
                                            "question": "Dáváte přednost osobní nebo vzdálené podpoře?",
                                            "options": {
                                                "in-person": {
                                                    "services": [
                                                        "krizová pomoc",
                                                        "psychiatrie",
                                                        "nízkoprahová denní centra"
                                                    ]
                                                },
                                                "remote": {
                                                    "services": [
                                                        "telefonická krizová pomoc",
                                                        "krizová pomoc"
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                },
                                "substance abuse emergency": {
                                    "question": "Máte závažné fyzické příznaky?",
                                    "options": {
                                        "yes": {
                                            "services": [
                                                "urgentní medicína",
                                                "protialkoholní a protitoxikomanická záchytná služba"
                                            ]
                                        },
                                        "no": {
                                            "question": "Hledáte okamžitou detoxikaci nebo trvalou podporu?",
                                            "options": {
                                                "immediate detox": {
                                                    "services": [
                                                        "protialkoholní a protitoxikomanická záchytná služba",
                                                        "adiktologická péče"
                                                    ]
                                                },
                                                "ongoing support": {
                                                    "services": [
                                                        "kontaktní centra",
                                                        "adiktologická péče",
                                                        "terapeutické komunity"
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                },
                                "need immediate shelter": {
                                    "question": "Utíkáte před domácím násilím?",
                                    "options": {
                                        "yes": {
                                            "services": [
                                                "intervenční centra",
                                                "azylové domy"
                                            ]
                                        },
                                        "no": {
                                            "question": "Máte s sebou děti?",
                                            "options": {
                                                "yes": {
                                                    "question": "Máte finanční potíže?",
                                                    "options": {
                                                        "yes": {
                                                            "question": "Potřebujete pomoc při hledání práce?",
                                                            "options": {
                                                                "yes": {
                                                                    "services": [
                                                                        "azylové domy",
                                                                        "sociálně aktivizační služby pro rodiny s dětmi",
                                                                        "pracovní poradenství"
                                                                    ]
                                                                },
                                                                "no": {
                                                                    "services": [
                                                                        "azylové domy",
                                                                        "sociálně aktivizační služby pro rodiny s dětmi",
                                                                        "finanční poradenství"
                                                                    ]
                                                                }
                                                            }
                                                        },
                                                        "no": {
                                                            "services": [
                                                                "azylové domy",
                                                                "sociálně aktivizační služby pro rodiny s dětmi"
                                                            ]
                                                        }
                                                    }
                                                },
                                                "no": {
                                                    "question": "Máte nějaké zdravotní problémy, kterým je třeba věnovat pozornost?",
                                                    "options": {
                                                        "yes": {
                                                            "question": "Souvisí tyto problémy se zneužíváním návykových látek?",
                                                            "options": {
                                                                "yes": {
                                                                    "services": [
                                                                        "noclehárny",
                                                                        "adiktologická péče",
                                                                        "zdravotní péče pro osoby bez přístřeší"
                                                                    ]
                                                                },
                                                                "no": {
                                                                    "services": [
                                                                        "noclehárny",
                                                                        "zdravotní péče pro osoby bez přístřeší",
                                                                        "sociální poradenství"
                                                                    ]
                                                                }
                                                            }
                                                        },
                                                        "no": {
                                                            "services": [
                                                                "noclehárny",
                                                                "azylové domy",
                                                                "nízkoprahová denní centra"
                                                            ]
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "ongoing support": {
                    "question": "Která oblast vašeho života právě teď potřebuje největší podporu?",
                    "options": {
                        "physical health": {
                            "question": "Potřebujete pravidelnou lékařskou péči nebo pomoc při každodenních činnostech?",
                            "options": {
                                "medical treatment": {
                                    "question": "Je váš stav chronický nebo akutní?",
                                    "options": {
                                        "chronic": {
                                            "question": "Potřebujete specializovanou péči?",
                                            "options": {
                                                "yes": {
                                                    "services": [
                                                        "ambulantní péče",
                                                        "lůžková péče",
                                                        "domácí péče"
                                                    ]
                                                },
                                                "no": {
                                                    "services": [
                                                        "všeobecné praktické lékařství",
                                                        "domácí péče"
                                                    ]
                                                }
                                            }
                                        },
                                        "acute": {
                                            "services": [
                                                "ambulantní péče",
                                                "jednodenní péče",
                                                "lůžková péče"
                                            ]
                                        }
                                    }
                                },
                                "daily activities": {
                                    "question": "Jakou úroveň asistence potřebujete?",
                                    "options": {
                                        "minimal": {
                                            "services": [
                                                "pečovatelská služba",
                                                "osobní asistence"
                                            ]
                                        },
                                        "moderate": {
                                            "services": [
                                                "osobní asistence",
                                                "denní stacionáře",
                                                "odlehčovací služby"
                                            ]
                                        },
                                        "extensive": {
                                            "question": "Dáváte přednost domácí péči nebo péči v zařízení?",
                                            "options": {
                                                "at home": {
                                                    "services": [
                                                        "domácí péče",
                                                        "osobní asistence",
                                                        "pečovatelská služba"
                                                    ]
                                                },
                                                "in a facility": {
                                                    "services": [
                                                        "domovy pro seniory",
                                                        "domovy pro osoby se zdravotním postižením",
                                                        "domovy se zvláštním režimem"
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "mental health": {
                            "question": "Are you dealing with a diagnosed condition or seeking general support?",
                            "options": {
                                "diagnosed condition": {
                                    "question": "S jakým typem duševního onemocnění se potýkáte?",
                                    "options": {
                                        "depression or anxiety": {
                                            "services": [
                                                "psychiatrie",
                                                "psychologická poradna",
                                                "krizová pomoc"
                                            ]
                                        },
                                        "severe mental illness": {
                                            "question": "Potřebujete lůžkovou nebo ambulantní péči?",
                                            "options": {
                                                "inpatient": {
                                                    "services": [
                                                        "psychiatrie",
                                                        "lůžková péče"
                                                    ]
                                                },
                                                "outpatient": {
                                                    "services": [
                                                        "psychiatrie",
                                                        "denní stacionáře",
                                                        "sociální rehabilitace"
                                                    ]
                                                }
                                            }
                                        },
                                        "addiction": {
                                            "services": [
                                                "adiktologická péče",
                                                "terapeutické komunity",
                                                "kontaktní centra"
                                            ]
                                        }
                                    }
                                },
                                "general support": {
                                    "question": "O co vám jde především?",
                                    "options": {
                                        "stress management": {
                                            "question": "Co je hlavním zdrojem vašeho stresu?",
                                            "options": {
                                                "work-related": {
                                                    "question": "Ovlivňuje to váš pracovní výkon?",
                                                    "options": {
                                                        "yes": {
                                                            "services": [
                                                                "pracovní poradenství",
                                                                "psychologická poradna",
                                                                "antistresové programy"
                                                            ]
                                                        },
                                                        "no": {
                                                            "services": [
                                                                "psychologická poradna",
                                                                "relaxační techniky",
                                                                "sociálně aktivizační služby"
                                                            ]
                                                        }
                                                    }
                                                },
                                                "personal relationships": {
                                                    "question": "Ovlivňuje to především váš rodinný nebo společenský život?",
                                                    "options": {
                                                        "family": {
                                                            "services": [
                                                                "rodinná terapie",
                                                                "mediace",
                                                                "psychologická poradna"
                                                            ]
                                                        },
                                                        "social life": {
                                                            "services": [
                                                                "sociálně aktivizační služby",
                                                                "psychologická poradna",
                                                                "podpůrné skupiny"
                                                            ]
                                                        }
                                                    }
                                                },
                                                "financial": {
                                                    "services": [
                                                        "finanční poradenství",
                                                        "dluhové poradenství",
                                                        "sociální poradenství"
                                                    ]
                                                }
                                            }
                                        },
                                        "relationship issues": {
                                            "question": "Jaký typ vztahu je příčinou obav?",
                                            "options": {
                                                "romantic": {
                                                    "question": "Uvažujete o párové terapii?",
                                                    "options": {
                                                        "yes": {
                                                            "services": [
                                                                "párová terapie",
                                                                "manželská poradna",
                                                                "mediace"
                                                            ]
                                                        },
                                                        "no": {
                                                            "services": [
                                                                "individuální psychologická poradna",
                                                                "koučink",
                                                                "podpůrné skupiny"
                                                            ]
                                                        }
                                                    }
                                                },
                                                "family": {
                                                    "services": [
                                                        "rodinná terapie",
                                                        "psychologická poradna",
                                                        "mediace"
                                                    ]
                                                },
                                                "friendships": {
                                                    "services": [
                                                        "psychologická poradna",
                                                        "sociálně aktivizační služby",
                                                        "podpůrné skupiny"
                                                    ]
                                                }
                                            }
                                        },
                                        "life transitions": {
                                            "question": "Jaký druh přechodu prožíváte?",
                                            "options": {
                                                "career change": {
                                                    "services": [
                                                        "kariérové poradenství",
                                                        "pracovní poradenství",
                                                        "rekvalifikační kurzy"
                                                    ]
                                                },
                                                "relocation": {
                                                    "services": [
                                                        "sociální poradenství",
                                                        "komunitní centra",
                                                        "integrační programy"
                                                    ]
                                                },
                                                "loss or grief": {
                                                    "services": [
                                                        "poradenství pro pozůstalé",
                                                        "terapie pro vyrovnání se se ztrátou",
                                                        "podpůrné skupiny"
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "housing and independent living": {
                            "question": "Potřebujete bydlení nebo podporu, abyste mohli žít samostatně?",
                            "options": {
                                "need a place to live": {
                                    "question": "Máte nějaké specifické potřeby v oblasti péče?",
                                    "options": {
                                        "yes": {
                                            "question": "Jaký typ péče potřebujete?",
                                            "options": {
                                                "elderly care": {
                                                    "services": [
                                                        "domovy pro seniory",
                                                        "domovy se zvláštním režimem"
                                                    ]
                                                },
                                                "disability support": {
                                                    "services": [
                                                        "domovy pro osoby se zdravotním postižením",
                                                        "chráněné bydlení"
                                                    ]
                                                },
                                                "mental health support": {
                                                    "services": [
                                                        "chráněné bydlení",
                                                        "domovy se zvláštním režimem"
                                                    ]
                                                }
                                            }
                                        },
                                        "no": {
                                            "services": [
                                                "azylové domy",
                                                "sociální bydlení",
                                                "domy na půl cesty"
                                            ]
                                        }
                                    }
                                },
                                "support for independent living": {
                                    "question": "Jaký typ podpory potřebujete?",
                                    "options": {
                                        "daily tasks": {
                                            "services": [
                                                "pečovatelská služba",
                                                "osobní asistence"
                                            ]
                                        },
                                        "health monitoring": {
                                            "services": [
                                                "domácí péče",
                                                "tísňová péče"
                                            ]
                                        },
                                        "social support": {
                                            "services": [
                                                "podpora samostatného bydlení",
                                                "sociálně aktivizační služby"
                                            ]
                                        },
                                        "all of the above": {
                                            "services": [
                                                "osobní asistence",
                                                "pečovatelská služba",
                                                "podpora samostatného bydlení"
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "for someone else": {
            "question": "Jaký je váš vztah k osobě, která potřebuje podporu?",
            "options": {
                "parent/guardian": {
                    "question": "Jaký je věk dítěte, o které pečujete?",
                    "options": {
                        "0-5 years": {
                            "question": "Má dítě nějaké vývojové problémy nebo postižení?",
                            "options": {
                                "yes": {
                                    "question": "Jaký druh podpory hledáte?",
                                    "options": {
                                        "early intervention": {
                                            "services": [
                                                "raná péče",
                                                "sociálně aktivizační služby pro rodiny s dětmi"
                                            ]
                                        },
                                        "medical support": {
                                            "services": [
                                                "dětské lékařství",
                                                "dětská neurologie",
                                                "dětská rehabilitace"
                                            ]
                                        },
                                        "educational support": {
                                            "services": [
                                                "speciálně pedagogické centrum",
                                                "pedagogicko-psychologická poradna"
                                            ]
                                        },
                                        "respite care": {
                                            "services": [
                                                "odlehčovací služby",
                                                "denní stacionáře"
                                            ]
                                        }
                                    }
                                },
                                "no": {
                                    "question": "Jaký druh podpory hledáte?",
                                    "options": {
                                        "childcare": {
                                            "question": "Jaký typ péče o děti hledáte?",
                                            "options": {
                                                "full-time": {
                                                    "services": [
                                                        "mateřské školy",
                                                        "dětské skupiny",
                                                        "soukromé jesle"
                                                    ]
                                                },
                                                "part-time": {
                                                    "services": [
                                                        "dětské kluby",
                                                        "mateřská centra",
                                                        "příležitostné hlídání dětí"
                                                    ]
                                                },
                                                "special needs": {
                                                    "services": [
                                                        "speciální mateřské školy",
                                                        "asistenční služby pro děti",
                                                        "raná péče"
                                                    ]
                                                }
                                            }
                                        },
                                        "health services": {
                                            "question": "Jaké zdravotní služby potřebujete?",
                                            "options": {
                                                "routine check-ups": {
                                                    "services": [
                                                        "dětské lékařství",
                                                        "pediatrické ambulance",
                                                        "preventivní programy pro děti"
                                                    ]
                                                },
                                                "specialized care": {
                                                    "services": [
                                                        "dětští specialisté",
                                                        "dětská nemocnice",
                                                        "vývojová diagnostika"
                                                    ]
                                                },
                                                "mental health": {
                                                    "services": [
                                                        "dětská psychologie",
                                                        "dětská psychiatrie",
                                                        "rodinná terapie"
                                                    ]
                                                }
                                            }
                                        },
                                        "family support": {
                                            "question": "Která oblast rodinného života potřebuje podporu?",
                                            "options": {
                                                "parenting skills": {
                                                    "services": [
                                                        "rodičovské skupiny",
                                                        "vzdělávací programy pro rodiče",
                                                        "rodinné poradenství"
                                                    ]
                                                },
                                                "work-life balance": {
                                                    "services": [
                                                        "flexibilní formy péče o děti",
                                                        "poradenství pro slaďování práce a rodiny",
                                                        "podpůrné skupiny pro rodiče"
                                                    ]
                                                },
                                                "financial assistance": {
                                                    "services": [
                                                        "sociální dávky pro rodiny s dětmi",
                                                        "finanční poradenství",
                                                        "materiální pomoc pro rodiny v nouzi"
                                                    ]
                                                }
                                            }
                                        },
                                        "early education": {
                                            "question": "O jaký typ raného vzdělávání máte zájem?",
                                            "options": {
                                                "cognitive development": {
                                                    "services": [
                                                        "programy pro rozvoj myšlení",
                                                        "edukativní hračky a pomůcky",
                                                        "kurzy pro rodiče o kognitivním rozvoji dětí"
                                                    ]
                                                },
                                                "social skills": {
                                                    "services": [
                                                        "dětské skupiny pro socializaci",
                                                        "programy pro rozvoj emoční inteligence",
                                                        "komunitní aktivity pro rodiny s dětmi"
                                                    ]
                                                },
                                                "creative arts": {
                                                    "services": [
                                                        "výtvarné kroužky pro nejmenší",
                                                        "hudební programy pro batolata",
                                                        "pohybové aktivity pro předškoláky"
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "6-18 years": {
                            "question": "Jaký je váš hlavní zájem?",
                            "options": {
                                "educational challenges": {
                                    "question": "Má dítě diagnostikovanou poruchu učení?",
                                    "options": {
                                        "yes": {
                                            "services": [
                                                "speciálně pedagogické centrum",
                                                "pedagogicko-psychologická poradna",
                                                "speciální vzdělávání"
                                            ]
                                        },
                                        "no": {
                                            "services": [
                                                "pedagogicko-psychologická poradna",
                                                "doučování",
                                                "školní poradenské pracoviště"
                                            ]
                                        }
                                    }
                                },
                                "behavioral issues": {
                                    "question": "Jak závažné jsou problémy s chováním?",
                                    "options": {
                                        "mild to moderate": {
                                            "services": [
                                                "pedagogicko-psychologická poradna",
                                                "dětská psychologie"
                                            ]
                                        },
                                        "severe": {
                                            "services": [
                                                "dětská psychiatrie",
                                                "středisko výchovné péče",
                                                "nízkoprahová zařízení pro děti a mládež"
                                            ]
                                        }
                                    }
                                },
                                "health concerns": {
                                    "question": "Jedná se o chronický nebo akutní problém?",
                                    "options": {
                                        "chronic": {
                                            "services": [
                                                "dětské lékařství",
                                                "specializovaná pediatrická péče",
                                                "domácí péče"
                                            ]
                                        },
                                        "acute": {
                                            "services": [
                                                "dětské lékařství",
                                                "dětská pohotovost"
                                            ]
                                        }
                                    }
                                },
                                "social integration": {
                                    "question": "Která konkrétní oblast sociální integrace je nejvíce znepokojující?",
                                    "options": {
                                        "peer relationships": {
                                            "question": "Je problémem šikana?",
                                            "options": {
                                                "yes": {
                                                    "services": [
                                                        "nízkoprahová zařízení pro děti a mládež",
                                                        "školní psycholog",
                                                        "preventivní programy proti šikaně"
                                                    ]
                                                },
                                                "no": {
                                                    "services": [
                                                        "nízkoprahová zařízení pro děti a mládež",
                                                        "sociálně aktivizační služby pro rodiny s dětmi",
                                                        "volnočasové aktivity"
                                                    ]
                                                }
                                            }
                                        },
                                        "cultural adaptation": {
                                            "question": "Je problémem jazyk?",
                                            "options": {
                                                "yes": {
                                                    "services": [
                                                        "jazykové kurzy pro děti a mládež",
                                                        "interkulturní pracovníci",
                                                        "sociálně aktivizační služby pro rodiny s dětmi"
                                                    ]
                                                },
                                                "no": {
                                                    "services": [
                                                        "nízkoprahová zařízení pro děti a mládež",
                                                        "interkulturní programy",
                                                        "volnočasové aktivity"
                                                    ]
                                                }
                                            }
                                        },
                                        "social skills": {
                                            "question": "Jsou diagnostikovány nějaké vývojové poruchy?",
                                            "options": {
                                                "yes": {
                                                    "services": [
                                                        "speciálně pedagogické centrum",
                                                        "sociálně aktivizační služby pro rodiny s dětmi",
                                                        "terapie sociálních dovedností"
                                                    ]
                                                },
                                                "no": {
                                                    "services": [
                                                        "nízkoprahová zařízení pro děti a mládež",
                                                        "volnočasové aktivity",
                                                        "skupinové programy pro rozvoj sociálních dovedností"
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "adult child caring for parent": {
                    "question": "Jaká je primární potřeba vašeho rodiče?",
                    "options": {
                        "medical care": {
                            "question": "Jedná se o chronické onemocnění nebo ponemocniční péči?",
                            "options": {
                                "chronic condition": {
                                    "question": "Zvládnou to doma s podporou?",
                                    "options": {
                                        "yes": {
                                            "services": [
                                                "domácí péče",
                                                "pečovatelská služba",
                                                "osobní asistence"
                                            ]
                                        },
                                        "no": {
                                            "services": [
                                                "domovy pro seniory",
                                                "domovy se zvláštním režimem",
                                                "léčebny dlouhodobě nemocných"
                                            ]
                                        }
                                    }
                                },
                                "post-hospital care": {
                                    "services": [
                                        "domácí péče",
                                        "rehabilitace",
                                        "odlehčovací služby"
                                    ]
                                }
                            }
                        },
                        "daily living assistance": {
                            "question": "Jakou úroveň pomoci potřebujete?",
                            "options": {
                                "light assistance": {
                                    "services": [
                                        "pečovatelská služba",
                                        "tísňová péče"
                                    ]
                                },
                                "moderate assistance": {
                                    "services": [
                                        "osobní asistence",
                                        "denní stacionáře"
                                    ]
                                },
                                "full-time care": {
                                    "question": "Dáváte přednost domácí nebo ústavní péči?",
                                    "options": {
                                        "home care": {
                                            "services": [
                                                "domácí péče",
                                                "osobní asistence",
                                                "pečovatelská služba"
                                            ]
                                        },
                                        "residential care": {
                                            "services": [
                                                "domovy pro seniory",
                                                "domovy se zvláštním režimem"
                                            ]
                                        }
                                    }
                                }
                            }
                        },
                        "cognitive decline": {
                            "question": "V jaké fázi kognitivního poklesu?",
                            "options": {
                                "early stage": {
                                    "services": [
                                        "geriatrie",
                                        "neurologie",
                                        "denní stacionáře"
                                    ]
                                },
                                "middle stage": {
                                    "services": [
                                        "domácí péče",
                                        "osobní asistence",
                                        "odlehčovací služby"
                                    ]
                                },
                                "late stage": {
                                    "services": [
                                        "domovy se zvláštním režimem",
                                        "paliativní péče"
                                    ]
                                }
                            }
                        },
                        "social engagement": {
                            "services": [
                                "sociálně aktivizační služby pro seniory a osoby se zdravotním postižením",
                                "denní stacionáře",
                                "kluby seniorů"
                            ]
                        }
                    }
                },
                "spouse/partner": {
                    "question": "Jaké jsou hlavní potřeby vašeho manžela/partnera?",
                    "options": {
                        "medical support": {
                            "question": "Jedná se o chronické onemocnění nebo akutní péči?",
                            "options": {
                                "chronic condition": {
                                    "question": "Does it require specialized care?",
                                    "options": {
                                        "yes": {
                                            "services": [
                                                "specializovaná ambulantní péče",
                                                "domácí péče",
                                                "lůžková péče"
                                            ]
                                        },
                                        "no": {
                                            "services": [
                                                "všeobecné praktické lékařství",
                                                "domácí péče"
                                            ]
                                        }
                                    }
                                },
                                "acute care": {
                                    "services": [
                                        "urgentní medicína",
                                        "lůžková péče",
                                        "rehabilitace"
                                    ]
                                }
                            }
                        },
                        "mental health support": {
                            "question": "Jedná se o diagnostikovaný stav nebo o obecnou podporu?",
                            "options": {
                                "diagnosed condition": {
                                    "services": [
                                        "psychiatrie",
                                        "psychoterapie",
                                        "denní stacionáře"
                                    ]
                                },
                                "general support": {
                                    "question": "Co je hlavním zdrojem stresu nebo obav?",
                                    "options": {
                                        "work-related stress": {
                                            "question": "Ovlivňuje to jejich pracovní výkon?",
                                            "options": {
                                                "yes": {
                                                    "services": [
                                                        "psychologická poradna",
                                                        "pracovní poradenství",
                                                        "antistresové programy"
                                                    ]
                                                },
                                                "no": {
                                                    "services": [
                                                        "psychologická poradna",
                                                        "relaxační techniky",
                                                        "manželská poradna"
                                                    ]
                                                }
                                            }
                                        },
                                        "relationship issues": {
                                            "question": "Uvažujete o párové terapii?",
                                            "options": {
                                                "yes": {
                                                    "services": [
                                                        "manželská poradna",
                                                        "párová psychoterapie",
                                                        "mediace"
                                                    ]
                                                },
                                                "no": {
                                                    "services": [
                                                        "individuální psychologická poradna",
                                                        "sociálně aktivizační služby",
                                                        "podpůrné skupiny"
                                                    ]
                                                }
                                            }
                                        },
                                        "life changes or transitions": {
                                            "question": "Souvisí to s nedávnou ztrátou nebo zármutkem?",
                                            "options": {
                                                "yes": {
                                                    "services": [
                                                        "psychologická poradna",
                                                        "terapie pro vyrovnání se se ztrátou",
                                                        "podpůrné skupiny pro pozůstalé"
                                                    ]
                                                },
                                                "no": {
                                                    "services": [
                                                        "psychologická poradna",
                                                        "koučink",
                                                        "sociálně aktivizační služby"
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "physical disability": {
                            "question": "Jedná se o nové postižení nebo o dlouhodobý stav?",
                            "options": {
                                "new disability": {
                                    "question": "What type of support is needed most urgently?",
                                    "options": {
                                        "medical care": {
                                            "services": [
                                                "rehabilitace",
                                                "fyzioterapie",
                                                "ergoterapie"
                                            ]
                                        },
                                        "home adaptations": {
                                            "services": [
                                                "sociální poradenství",
                                                "půjčovny kompenzačních pomůcek"
                                            ]
                                        },
                                        "personal care": {
                                            "services": [
                                                "osobní asistence",
                                                "pečovatelská služba"
                                            ]
                                        }
                                    }
                                },
                                "long-term condition": {
                                    "question": "Který aspekt života potřebuje největší podporu?",
                                    "options": {
                                        "mobility": {
                                            "services": [
                                                "osobní asistence",
                                                "přeprava osob se zdravotním postižením"
                                            ]
                                        },
                                        "self-care": {
                                            "services": [
                                                "pečovatelská služba",
                                                "osobní asistence"
                                            ]
                                        },
                                        "social integration": {
                                            "services": [
                                                "sociálně aktivizační služby pro osoby se zdravotním postižením",
                                                "centra denních služeb"
                                            ]
                                        }
                                    }
                                }
                            }
                        },
                        "end-of-life care": {
                            "question": "Kde by váš manžel/partner preferoval péči?",
                            "options": {
                                "at home": {
                                    "services": [
                                        "domácí hospic",
                                        "paliativní péče",
                                        "odlehčovací služby"
                                    ]
                                },
                                "in a facility": {
                                    "services": [
                                        "lůžkový hospic",
                                        "paliativní oddělení nemocnice"
                                    ]
                                }
                            }
                        }
                    }
                },
                "other family member or friend": {
                    "question": "Jaká je věková skupina osoby, o kterou pečujete?",
                    "options": {
                        "child (under 18)": {
                            "question": "Jaké téma u dítěte chcete řešit?",
                            "options": {
                                "health issues": {
                                    "services": [
                                        "dětské lékařství",
                                        "specializovaná pediatrická péče"
                                    ]
                                },
                                "behavioral or emotional issues": {
                                    "services": [
                                        "dětská psychologie",
                                        "pedagogicko-psychologická poradna"
                                    ]
                                },
                                "educational support": {
                                    "services": [
                                        "speciálně pedagogické centrum",
                                        "doučování"
                                    ]
                                },
                                "social integration": {
                                    "services": [
                                        "nízkoprahová zařízení pro děti a mládež",
                                        "sociálně aktivizační služby pro rodiny s dětmi"
                                    ]
                                }
                            }
                        },
                        "adult (18-64)": {
                            "question": "Jaký typ podpory tato osoba nejvíce potřebuje?",
                            "options": {
                                "medical care": {
                                    "question": "Jedná se o chronické onemocnění nebo akutní péči?",
                                    "options": {
                                        "chronic condition": {
                                            "question": "Vyžaduje specializovanou péči?",
                                            "options": {
                                                "yes": {
                                                    "services": [
                                                        "specializovaná ambulantní péče",
                                                        "domácí péče",
                                                        "odborné sociální poradenství"
                                                    ]
                                                },
                                                "no": {
                                                    "services": [
                                                        "všeobecné praktické lékařství",
                                                        "domácí péče",
                                                        "sociální poradenství"
                                                    ]
                                                }
                                            }
                                        },
                                        "acute care": {
                                            "services": [
                                                "urgentní medicína",
                                                "lůžková péče",
                                                "následná rehabilitace"
                                            ]
                                        }
                                    }
                                },
                                "mental health support": {
                                    "question": "Jedná se o diagnostikovaný stav nebo o obecnou podporu?",
                                    "options": {
                                        "diagnosed condition": {
                                            "question": "Jaký typ duševního onemocnění?",
                                            "options": {
                                                "depression or anxiety": {
                                                    "services": [
                                                        "psychiatrie",
                                                        "psychoterapie",
                                                        "podpůrné skupiny"
                                                    ]
                                                },
                                                "severe mental illness": {
                                                    "services": [
                                                        "psychiatrie",
                                                        "komunitní péče v oblasti duševního zdraví",
                                                        "chráněné bydlení"
                                                    ]
                                                },
                                                "addiction": {
                                                    "services": [
                                                        "adiktologická péče",
                                                        "terapeutické komunity",
                                                        "kontaktní centra"
                                                    ]
                                                }
                                            }
                                        },
                                        "general support": {
                                            "services": [
                                                "psychologická poradna",
                                                "sociálně aktivizační služby",
                                                "krizová pomoc"
                                            ]
                                        }
                                    }
                                },
                                "disability support": {
                                    "question": "Který aspekt života potřebuje největší podporu?",
                                    "options": {
                                        "mobility": {
                                            "services": [
                                                "osobní asistence",
                                                "přeprava osob se zdravotním postižením",
                                                "půjčovny kompenzačních pomůcek"
                                            ]
                                        },
                                        "self-care": {
                                            "services": [
                                                "pečovatelská služba",
                                                "osobní asistence",
                                                "domácí péče"
                                            ]
                                        },
                                        "employment": {
                                            "services": [
                                                "sociální rehabilitace",
                                                "podporované zaměstnávání",
                                                "pracovní rehabilitace"
                                            ]
                                        },
                                        "social integration": {
                                            "services": [
                                                "sociálně aktivizační služby pro osoby se zdravotním postižením",
                                                "centra denních služeb",
                                                "volnočasové aktivity pro osoby se zdravotním postižením"
                                            ]
                                        }
                                    }
                                },
                                "addiction treatment": {
                                    "question": "V jaké fázi léčby závislosti?",
                                    "options": {
                                        "early intervention": {
                                            "services": [
                                                "adiktologická ambulance",
                                                "poradenství pro závislosti",
                                                "svépomocné skupiny"
                                            ]
                                        },
                                        "detoxification": {
                                            "services": [
                                                "detoxifikační jednotka",
                                                "adiktologická péče",
                                                "psychiatrická péče"
                                            ]
                                        },
                                        "rehabilitation": {
                                            "services": [
                                                "terapeutické komunity",
                                                "střednědobá ústavní léčba",
                                                "doléčovací programy"
                                            ]
                                        },
                                        "long-term support": {
                                            "services": [
                                                "ambulantní doléčovací programy",
                                                "chráněné bydlení pro osoby se závislostí",
                                                "podpůrné skupiny"
                                            ]
                                        }
                                    }
                                }
                            }
                        },
                        "senior (65+)": {
                            "question": "Jaká je primární potřeba seniora o kterého pečuejte?",
                            "options": {
                                "daily living assistance": {
                                    "services": [
                                        "pečovatelská služba",
                                        "osobní asistence",
                                        "tísňová péče"
                                    ]
                                },
                                "medical care": {
                                    "services": [
                                        "geriatrie",
                                        "domácí péče",
                                        "léčebny dlouhodobě nemocných"
                                    ]
                                },
                                "dementia care": {
                                    "services": [
                                        "domovy se zvláštním režimem",
                                        "denní stacionáře",
                                        "odlehčovací služby"
                                    ]
                                },
                                "social engagement": {
                                    "services": [
                                        "sociálně aktivizační služby pro seniory",
                                        "kluby seniorů",
                                        "centra denních služeb"
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

let currentNode = decisionTree;

function displayQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');

    questionElement.textContent = currentNode.question;
    optionsElement.innerHTML = '';

    for (const [option, value] of Object.entries(currentNode.options)) {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => selectOption(option));
        optionsElement.appendChild(button);
    }
}

function selectOption(option) {
    currentNode = currentNode.options[option];
    if (currentNode.services) {
        displayResults(currentNode.services);
    } else {
        displayQuestion();
    }
}

function displayResults(services) {
    const questionContainer = document.getElementById('question-container');
    const resultsContainer = document.getElementById('results');
    const servicesList = document.getElementById('services-list');

    questionContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    servicesList.innerHTML = '';

    services.forEach(service => {
        const li = document.createElement('li');
        li.textContent = service;
        servicesList.appendChild(li);
    });
}

function startOver() {
    currentNode = decisionTree;
    const questionContainer = document.getElementById('question-container');
    const resultsContainer = document.getElementById('results');

    questionContainer.style.display = 'block';
    resultsContainer.style.display = 'none';
    displayQuestion();
}

document.getElementById('start-over').addEventListener('click', startOver);

// Start the questionnaire
displayQuestion();