(function(window) {
    'use strict';
	
    function medallionCheck(i) {
        if ((items.sword === 0 && flags.swordmode != 'S') || !items.bombos && !items.ether && !items.quake) return 'unavailable';
        if (medallions[i] === 1 && !items.bombos ||
            medallions[i] === 2 && !items.ether ||
            medallions[i] === 3 && !items.quake) return 'unavailable';
        if (medallions[i] === 0 && !(items.bombos && items.ether && items.quake)) return 'possible';
    }

    function medallion_check(i) {
        if ((items.sword === 0 && flags.swordmode != 'S') || !items.bombos && !items.ether && !items.quake) return 'unavailable';
        if (medallions[i] === 1 && !items.bombos ||
            medallions[i] === 2 && !items.ether ||
            medallions[i] === 3 && !items.quake) return 'unavailable';
		if (items.bombos && items.ether && items.quake) return 'available';
        if (medallions[i] === 0 && !(items.bombos && items.ether && items.quake)) return 'possible';
		return 'available';
    }
	
	function crystalCheck() {
		var crystal_count = 0;
		for (var k = 0; k < 10; k++) {
			if ((prizes[k] === 3 || prizes[k] === 4) && items['boss'+k]) {
				crystal_count++;
			}
		}
		return crystal_count;
	}

	function allDungeonCheck() {
		for (var k = 0; k < 10; k++) {
			if (!items['boss'+k]) {
				return false;
			}
		}
		return true;
	}
	
    function melee() { return items.sword || items.hammer; }
    function melee_bow() { return melee() || items.bow > 1; }
    function cane() { return items.somaria || items.byrna; }
    function rod() { return items.firerod || items.icerod; }
    function canHitSwitch() { return items.bomb || melee_bow() || cane() || rod() || items.boomerang || items.hookshot; }
    function agatowerweapon() { return items.sword > 0 || items.somaria || items.bow > 1 || items.hammer || items.firerod || (items.byrna && (items.bottle > 0 || items.magic)); }
    function always() { return 'available'; }

	function can_reach_outcast() {
		return (items.moonpearl && (items.glove === 2 || items.glove && items.hammer || items.agahnim && items.hookshot && (items.hammer || items.glove || items.flippers)));
	}
	
	function can_reach_outcast_glitched() {
		return (flags.glitches != 'N' && (items.boots || items.glove || items.flute) && ((items.moonpearl && items.boots) || items.mirror)) || flags.glitches === 'M';
	}
	
	function canReachDarkWorld()
	{
		return (items.moonpearl && (items.glove === 2 || items.glove && items.hammer || items.agahnim || flags.glitches != 'N' && items.boots)) || flags.glitches === 'M';
	}
	
	function canReachLightWorld()//Can walk around in Light World as Link
	{
		return items.moonpearl && (items.glove === 2 || items.glove && items.hammer || items.agahnim);
	}

	function canReachLightWorldBunny()//Can walk around in Light World as bunny or Link
	{
		return items.agahnim || canReachLightWorld() || (items.glove === 2 && activeFlute());
	}

	function canGetBonkableItem()
	{
		return items.boots || (items.sword && items.quake);
	}

	function canReachPyramid()
	{
		return items.flippers || canReachPyramidWithoutFlippers();
	}

	function canReachPyramidWithoutFlippers()
	{
		return items.hammer || activeFlute() || (items.mirror && canReachLightWorldBunny());
	}

	function activeFlute()
	{
		return items.flute && (canReachLightWorld() || flags.activatedflute);
	}
	
	function canSpinSpeed()
	{
		return items.boots && (items.sword || items.hookshot);
	}
	
	function glitchLinkState()
	{
		return flags.glitches === 'M' && (items.moonpearl || items.bottle)
	}

	function canBunnyPocket()
	{
		return items.boots && (items.mirror || items.bottle)
	}
	
	
	// Regional functions, does not cover Inverted
	
	function canReachWDM() { // West Death Mountain
		return items.flute || (flags.glitches != 'N' && items.boots) || items.glove || flags.glitches === 'M';
	}
	
	function canReachEDM() { // East Death Mountain
		return (flags.glitches != 'N' && items.boots) || (((flags.glitches != 'N' && items.mirror) || items.hookshot) && canReachWDM()) || (items.hammer && canReachToH()) || flags.glitches === 'M';
	}
	
	function canReachDDM() { // Dark Death Mountain
		return (items.glove === 2 && canReachEDM()) || (flags.glitches != 'N' && items.boots && (items.moonpearl || items.hammer)) || flags.glitches === 'M' || (canReachWDM() && flags.glitches != 'N' && items.mirror);
	}
	
	function canReachNWDW() { // North West Dark World
		return (flags.glitches != 'N' && canReachWDM() && items.mirror) || flags.glitches === 'M' || (items.moonpearl && ((canReachNEDW() && items.hookshot && (items.hammer || items.glove || items.flippers)) || (items.hammer && items.glove) || items.glove === 2 || (flags.glitches != 'N' && items.boots)));
	}
	
	function canReachNEDW() { // North East Dark World
		return (flags.glitches != 'N' && items.moonpearl && items.boots) || flags.glitches === 'M' || (flags.glitches != 'N' && items.mirror && canReachWDM() && (items.boots || items.moonpearl)) || items.agahnim || (items.moonpearl && items.hammer && items.glove) || ((items.glove === 2 || (flags.glitches != 'N' && (canSpinSpeed() || items.mirror))) && items.moonpearl && (items.hammer || items.flippers || flags.glitches != 'N')); // This last glitched logic stands for a Fake Flippers, in the code it also requires being able to take damage, sounds like Qirn Jump ?
	}
	
	function canReachSDW() { // South Dark World
		return (items.moonpearl && canReachNEDW() && (items.hammer || (flags.glitches != 'N' && canSpinSpeed()))) || canReachNWDW();
	}
	
	function canReachDP() { // Desert Palace
		return items.book || (flags.glitches != 'N' && items.boots) || flags.glitches === 'M' || (items.mirror && canReachMireArea());
	}
	
	function canReachToH() { // Tower of Hera
		return (flags.glitches != 'N' && items.boots) || flags.glitches === 'M' || ((items.mirror || (items.hookshot && items.hammer)) && canReachWDM()) ;
	}
	
	function canReachMireArea() {
		return (items.glove === 2 && (items.flute || (flags.glitches != 'N' && items.boots))) || (items.moonpearl && (flags.glitches != 'N' && items.boots) && canReachSDW()) || flags.glitches === 'M'; 
	}
	
	window.loadChestFlagsItem = function() {
			
		//Is OWG Mode, does not cover Inverted
		if (flags.glitches === "O" || flags.glitches === 'H' || flags.glitches === 'M')
		{
			// define dungeon chests
			window.dungeons = [{ // [0]
				caption: 'Eastern Palace',
				is_beaten: false,
				is_beatable: function() {
					return window.EPBoss();
				},
				can_get_chest: function() {
					return window.EPChests();
				}
			}, { // [1]
				caption: 'Desert Palace {book} / {glove2} {mirror} {flute}',
				is_beaten: false,
				is_beatable: function() {
					return canReachDP() ? window.DPBoss() : 'unavailable';
				},
				can_get_chest: function() {
					return canReachDP() ? window.DPChests() : 'unavailable';
				}
			}, { // [2]
				caption: 'Tower of Hera {mirror} / {hookshot} {hammer}',
				is_beaten: false,
				is_beatable: function() {
					return canReachToH() ? window.HeraBoss() : 'unavailable';
				},
				can_get_chest: function() {
					return canReachToH() ? window.HeraChests() : 'unavailable';
				}
			}, { // [3]
				caption: 'Palace of Darkness',
				is_beaten: false,
				is_beatable: function() {
					if (flags.glitches === 'H' || flags.glitches === 'M') {
						return (items.boots || (flags.glitches === 'M')) ? window.PoDBoss() : 'unavailable';
					} else {
					return canReachNEDW() && items.moonpearl ? window.PoDBoss() : 'unavailable';
					}
				},
				can_get_chest: function() {
					if (flags.glitches === 'H' || flags.glitches === 'M') {
						return (items.boots || (flags.glitches === 'M')) ? window.PoDChests() : 'unavailable';
					} else {
					return canReachNEDW() && items.moonpearl ? window.PoDChests() : 'unavailable';
				}
				}
			}, { // [4]
				caption: 'Swamp Palace {mirror} {flippers}',
				is_beaten: false,
				is_beatable: function() {
					if (flags.glitches === 'H' || flags.glitches === 'M') {
						return window.SPBoss();
					} else {
					return canReachSDW() && items.flippers && items.moonpearl && items.mirror ? window.SPBoss() : 'unavailable';
					}
				},
				can_get_chest: function() {
					if (flags.glitches === 'H' || flags.glitches === 'M') {
						return window.SPChests();
					} else {
					return canReachSDW() && items.flippers && items.moonpearl && items.mirror ? window.SPChests() : 'unavailable';
				}
				}
			}, { // [5]
				caption: 'Skull Woods',
				is_beaten: false,
				is_beatable: function() {
					if (flags.v311 === 'Y') {
						return canReachNWDW() && ((items.moonpearl || canBunnyPocket())) ? window.SWBoss() : 'unavailable';
					}
					return canReachNWDW() && items.moonpearl ? window.SWBoss() : 'unavailable';
				},
				can_get_chest: function() {
					return canReachNWDW() ? window.SWChests() : 'unavailable';
				}
			}, { // [6]
				caption: 'Thieves\' Town',
				is_beaten: false,
				is_beatable: function() {
					return canReachNWDW() && (items.moonpearl || glitchLinkState()) ? window.TTBoss() : 'unavailable';
				},
				can_get_chest: function() {
					return canReachNWDW() && (items.moonpearl || glitchLinkState()) ? window.TTChests() : 'unavailable';
				}
			}, { // [7]
				caption: 'Ice Palace {flippers} [{firerod}/{bombos}]',
				is_beaten: false,
				is_beatable: function() {
					if (!items.firerod && (!items.bombos || items.bombos && (items.sword == 0 && flags.swordmode != 'S'))) return 'unavailable';
					if (flags.v311 === 'Y') {
						return (items.glove === 2) || (canReachSDW() && (items.moonpearl || glitchLinkState()) && (flags.glitches === 'M' && items.mirror)) ? window.IPBoss() : 'unavailable';
					}
					return (items.glove === 2) || (canReachSDW() && (items.moonpearl || glitchLinkState()) && (((items.boots || flags.glitches === 'M') && items.flippers) || (flags.glitches === 'M' && items.mirror))) ? window.IPBoss() : 'unavailable';
				},
				can_get_chest: function() {
					if (!items.firerod && (!items.bombos || items.bombos && (items.sword == 0 && flags.swordmode != 'S')) && flags.glitches !== 'M' && flags.glitches !== 'H') return 'unavailable';
					if (flags.v311 === 'Y') {
						return (items.glove === 2) || (canReachSDW() && (items.moonpearl || glitchLinkState())  && (flags.glitches === 'M' && items.mirror)) ? window.IPChests() : 'unavailable';
					}
					return (items.glove === 2) || (canReachSDW() && (items.moonpearl || glitchLinkState())  && (((items.boots || flags.glitches === 'M') && items.flippers) || (flags.glitches === 'M' && items.mirror))) ? window.IPChests() : 'unavailable';
				}
			}, { // [8]
				caption: 'Misery Mire {medallion0} [{boots}/{hookshot}]',
				is_beaten: false,
				is_beatable: function() {
					if (!items.boots && !items.hookshot) return 'unavailable';
					return canReachMireArea() && (items.moonpearl || glitchLinkState())  ? window.MMBoss(medallion_check(0)) : 'unavailable';
				},
				can_get_chest: function() {
					if (!items.boots && !items.hookshot) return 'unavailable';
					return canReachMireArea() && (items.moonpearl || glitchLinkState())  ? window.MMChests(medallion_check(0)) : 'unavailable';
				}
			}, { // [9]
				caption: 'Turtle Rock {medallion0}/{mirror}',
				is_beaten: false,
				is_beatable: function() {
					return (items.mirror || (items.boots && items.moonpearl) || (flags.glitches === 'M')) && (items.boots || items.somaria || items.hookshot || items.cape || items.byrna || flags.glitches === 'M') && items.bigkey9 && canReachDDM() ? window.TRMidBoss() : 
						medallionCheck(1) != 'unavailable' && items.moonpearl && items.somaria && ((items.hammer && items.glove === 2 && canReachEDM()) || items.boots) ? window.TRFrontBoss(medallion_check(1)) :
						'unavailable';
				},
				can_get_chest: function() {
					return (items.mirror || (items.boots && items.moonpearl) || (flags.glitches === 'M')) && (items.boots || items.somaria || items.hookshot || items.cape || items.byrna || flags.glitches === 'M') && canReachDDM() ? window.TRMidChests() : 
						medallionCheck(1) != 'unavailable' && items.moonpearl && items.somaria && ((items.hammer && items.glove === 2 && canReachEDM()) || items.boots) ? window.TRFrontChests(medallion_check(1)) :
						'unavailable';
				}
			}, { // [10]
				caption: 'Ganon\'s Castle (Crystals)',
				is_beaten: false,
				is_beatable: function() {
					if ((crystalCheck() < flags.ganonvulncount && flags.goals != 'A') || (!items.agahnim2 && flags.goals != 'F') || !canReachNEDW() || (flags.goals === 'A' && (!items.agahnim || !allDungeonCheck()))) return 'unavailable';
					if ((flags.swordmode != 'S' && items.sword < 2) || (flags.swordmode === 'S' && !items.hammer) || (!items.lantern && !items.firerod)) return 'unavailable';
					//Fast Ganon
					if (flags.goals === 'F' && (items.sword > 1 || flags.swordmode === 'S' && (items.hammer || items.net)) && (items.lantern || items.firerod)) return 'available';
					return window.GTBoss();
				},
				can_get_chest: function() {
					return (items.moonpearl || flags.glitches === 'M') && ((crystalCheck() >= flags.opentowercount && canReachDDM()) || ((items.boots && canReachWDM()) || (flags.glitches === 'M')) ) ? window.GTChests() : 'unavailable';
				}
			}, { // [11]
				caption: 'Hyrule Castle',//Only used with Entrance or Door Shuffle
				is_beaten: false,
				is_beatable: function() {
					return items.chest11 ?window.dungeons[11].can_get_chest() :'opened';
				},
				can_get_chest: function() {
					return window.doorCheck(11,false,false,flags.gametype != 'S',['glove','killbomb','bombdash'],'item');
				}
			}, { // [12]
				caption: 'Castle Tower',//Only used with Entrance or Door Shuffle
				is_beaten: false,
				is_beatable: function() {
					return window.agahnim.is_available();
				},
				can_get_chest: function() {
					if(items.sword < 2 && (flags.swordmode != 'S' || !items.hammer) && !items.cape && !items.agahnim)
						return 'unavailable';
					if(items.mirror && (items.agahnim || (items.glove && items.hammer && items.moonpearl) || (items.glove === 2 && items.moonpearl && items.flippers)))
						return window.doorCheck(12,false,true,true,['kill','swordorswordless'],'item');
					return 'possible';
				}
			}];

			window.agahnim = {
				caption: 'Agahnim {sword2}/ ({cape}{sword1}){lantern}',
				is_available: function() {
					if (items.sword < 2 && (flags.swordmode != 'S' || !items.hammer) && !items.cape) return 'unavailable';
					if (!items.sword && !items.hammer && !items.net) return 'unavailable';
					return (items.sword >= 2 || (items.cape && items.sword) || (flags.swordmode === 'S' && (items.hammer || (items.cape && items.net)))) && (items.smallkeyhalf1 === 2 || flags.gametype == 'R') && agatowerweapon() ? items.lantern ? 'available' : 'darkavailable' : 'unavailable';
				}
			};

			//define overworld chests
			window.chests = [{ // [0]
				caption: 'King\'s Tomb {boots} + {glove2}/{mirror}',
				is_opened: false,
				is_available: function() {
					return items.boots ? 'available' : 'unavailable';
				}
			}, { // [1]
				caption: 'Light World Swamp (2)',
				is_opened: false,
				is_available: always
			}, { // [2]
				caption: 'Stoops Lonk\'s Hoose',
				is_opened: (flags.gametype === 'S'),
				is_available: always
			}, { // [3]
				caption: 'Spiral Cave',
				is_opened: false,
				is_available: function() {
					return canReachEDM() ?
						items.lantern || items.flute || items.boots || flags.glitches === 'M' ? 'available' : 'darkavailable' :
						'unavailable';
				}
			}, { // [4]
				caption: 'Mimic Cave ({mirror} outside of Turtle Rock)(Yellow = {medallion0} unknown OR possible w/out {firerod})',
				is_opened: false,
				is_available: function() {
					return items.mirror && items.hammer && canReachEDM() ? 
						items.lantern || items.flute || items.boots || flags.glitches === 'M' ? 'available' : 'darkavailable' : 'unavailable';
				}
			}, { // [5]
				caption: 'Tavern',
				is_opened: false,
				is_available: always
			}, { // [6]
				caption: 'Chicken House {bomb}',
				is_opened: false,
				is_available: always
			}, { // [7]
				caption: 'Bombable Hut {bomb}',
				is_opened: false,
				is_available: function() {
					return canReachNWDW() && (items.moonpearl || glitchLinkState()) ? 'available' : 'unavailable';
				}
			}, { // [8]
				caption: 'C House',
				is_opened: false,
				is_available: function() {
					return canReachNWDW() ? 'available' : 'unavailable';
				}
			}, { // [9]
				caption: 'Aginah\'s Cave {bomb}',
				is_opened: false,
				is_available: always
			}, { // [10]
				caption: 'Mire Shed (2)',
				is_opened: false,
				is_available: function() {
					return canReachMireArea() && (items.moonpearl || items.mirror || glitchLinkState()) ? 'available' : 'unavailable';
				}
			}, { // [11]
				caption: 'Super Bunny Chests (2)',
				is_opened: false,
				is_available: function() {
					return canReachDDM() ?
						items.lantern || items.flute || items.boots || flags.glitches === 'M' ? 'available' : 'darkavailable' :
						'unavailable';
				}
			}, { // [12]
				caption: 'Sahasrahla\'s Hut (3) {bomb}/{boots}',
				is_opened: false,
				is_available: always
			}, { // [13]
				caption: 'Byrna Spike Cave',
				is_opened: false,
				is_available: function() {
					return canReachWDM() && (items.moonpearl || glitchLinkState()) && items.glove && items.hammer && (items.byrna || (items.cape && (items.bottle || items.magic))) ?
						items.lantern || items.flute || items.boots || glitchLinkState() ? 'available' : 'darkavailable' :
						'unavailable';
				}
			}, { // [14]
				caption: 'Kakariko Well (4 + {bomb})',
				is_opened: false,
				is_available: always
			}, { // [15]
				caption: 'Thieve\'s Hut (4 + {bomb})',
				is_opened: false,
				is_available: always
			}, { // [16]
				caption: 'Hype Cave! {bomb} (NPC + 4 {bomb})',
				is_opened: false,
				is_available: function() {
					return canReachSDW() && (items.moonpearl || glitchLinkState()) ? 'available' : 'unavailable';
				}
			}, { // [17]
				caption: 'Paradox Cave (5 + 2 {bomb})',
				is_opened: false,
				is_available: function() {
					return canReachEDM() ?
						items.lantern || items.flute || items.boots || flags.glitches === 'M' ? 'available' : 'darkavailable' :
						'unavailable';
				}
			}, { // [18]
				caption: 'West of Sanctuary {boots}',
				is_opened: false,
				is_available: function() {
					return items.boots ? 'available' : 'unavailable';
				}
			}, { // [19]
				caption: 'Minimoldorm Cave (NPC + 4) {bomb}',
				is_opened: false,
				is_available: always
			}, { // [20]
				caption: 'Ice Rod Cave {bomb}',
				is_opened: false,
				is_available: always
			}, { // [21]
				caption: 'Hookshot Cave (bottom chest) {hookshot}/{boots}',
				is_opened: false,
				is_available: function() {
					return canReachEDM() && (items.moonpearl || glitchLinkState()) && (items.glove || items.boots || flags.glitches === 'M') && (items.boots || items.hookshot) ?
						items.lantern || items.flute || items.boots || flags.glitches === 'M' ? 'available' : 'darkavailable' :
						'unavailable';
				}
			}, { // [22]
				caption: 'Hookshot Cave (3 top chests) {hookshot}',
				is_opened: false,
				is_available: function() {
					return canReachEDM() && (items.moonpearl || glitchLinkState()) && (items.glove || items.boots || flags.glitches === 'M') && items.hookshot ?
						items.lantern || items.flute || items.boots || flags.glitches === 'M' ? 'available' : 'darkavailable' :
						'unavailable';
				}
			}, { // [23]
				caption: 'Lost Woods Hideout Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [24]
				caption: 'Death Mountain Bonk Rocks',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && canReachEDM() ?
					(items.lantern || items.flute ? 'bonkable' : 'darkbonkable') : 'unbonkable';
				}
			}, { // [25]
				caption: 'Mountain Entry Pull Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [26]
				caption: 'Mountain Entry Southeast Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [27]
				caption: 'Lost Woods Pass West Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [28]
				caption: 'Kakariko Portal Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [29]
				caption: 'Fortune Bonk Rocks',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [30]
				caption: 'Kakariko Pond Tree',
				is_opened: false,
				is_available: function() {
					return items.agahnim && (canGetBonkableItem()) ? 'bonkable' : 'unbonkable';
				}
			}, { // [31]
				caption: 'Bonk Rocks Tree',
				is_opened: false,
				is_available: function() {
					return items.agahnim && (canGetBonkableItem()) ? 'bonkable' : 'unbonkable';
				}
			}, { // [32]
				caption: 'Sanctuary Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [33]
				caption: 'River Bend West Tree',
				is_opened: false,
				is_available: function() {
					return items.agahnim && (canGetBonkableItem()) ? 'bonkable' : 'unbonkable';
				}
			}, { // [34]
				caption: 'River Bend East Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [35]
				caption: 'Blinds Hideout Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [36]
				caption: 'Kakariko Welcome Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [37]
				caption: 'Forgotten Forest Southwest Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [38]
				caption: 'Forgotten Forest Central Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [39]
				caption: 'Hyrule Castle Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [40]
				caption: 'Wooden Bridge Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [41]
				caption: 'Eastern Palace Tree',
				is_opened: false,
				is_available: function() {
					return items.agahnim && canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [42]
				caption: 'Flute Boy South Tree',
				is_opened: false,
				is_available: function() {
					return items.agahnim && canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [43]
				caption: 'Flute Boy East Tree',
				is_opened: false,
				is_available: function() {
					return items.agahnim && canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [44]
				caption: 'Central Bonk Rocks Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [45]
				caption: 'Tree Line Tree 2',
				is_opened: false,
				is_available: function() {
					return items.agahnim && canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [46]
				caption: 'Tree Line Tree 4',
				is_opened: false,
				is_available: function() {
					return items.agahnim && canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [47]
				caption: 'Flute Boy Approach South Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [48]
				caption: 'Flute Boy Approach North Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [49]
				caption: 'Dark Lumberjack Tree',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && (canGetBonkableItem()) && canReachNWDW() ? 'bonkable' : 'unbonkable';
				}
			}, { // [50]
				caption: 'Dark Fortune Bonk Rocks (2)',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && canGetBonkableItem() && canReachNWDW() ? 'bonkable' : 'unbonkable';
				}
			}, { // [51]
				caption: 'Dark Graveyard West Bonk Rock',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && canGetBonkableItem() && canReachNWDW() ? 'bonkable' : 'unbonkable';
				}
			}, { // [52]
				caption: 'Dark Graveyard North Bonk Rocks',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && canGetBonkableItem() && canReachNWDW() ? 'bonkable' : 'unbonkable';
				}
			}, { // [53]
				caption: 'Dark Graveyard Tomb Bonk Rocks',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && canGetBonkableItem() && canReachNWDW() ? 'bonkable' : 'unbonkable';
				}
			}, { // [54]
				caption: 'Qirn Jump West Tree',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && canGetBonkableItem() && canReachNWDW() ? 'bonkable' : 'unbonkable';
				}
			}, { // [55]
				caption: 'Qirn Jump East Tree',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && canGetBonkableItem() && canReachNEDW() && (items.flippers || items.glove || items.hammer) ? 'bonkable' : 'unbonkable';
				}
			}, { // [56]
				caption: 'Dark Witch Tree',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && canGetBonkableItem() && canReachNEDW() && (items.flippers || items.glove || items.hammer) ? 'bonkable' : 'unbonkable';
				}
			}, { // [57]
				caption: 'Pyramid Tree',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && canGetBonkableItem() && canReachNEDW() ? 'bonkable' : 'unbonkable';
				}
			}, { // [58]
				caption: 'Palace of Darkness Tree',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && canGetBonkableItem() && canReachNEDW() ? 'bonkable' : 'unbonkable';
				}
			}, { // [59]
				caption: 'Dark Tree Line Tree 2',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && canGetBonkableItem() && canReachNEDW() ? 'bonkable' : 'unbonkable';
				}
			}, { // [60]
				caption: 'Dark Tree Line Tree 3',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && canGetBonkableItem() && canReachNEDW() ? 'bonkable' : 'unbonkable';
				}
			}, { // [61]
				caption: 'Dark Tree Line Tree 4',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && canGetBonkableItem() && canReachNEDW() ? 'bonkable' : 'unbonkable';
				}
			}, { // [62]
				caption: 'Hype Cave Statue',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && canGetBonkableItem() && canReachNWDW() ? 'bonkable' : 'unbonkable';
				}
			}, { // [63]
				caption: 'Cold Fairy Statue',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && items.bomb ? 'bonkable' : 'unbonkable';
				}
			}, { // [64]
				caption: 'Treasure Chest Minigame: Pay 30 rupees',
				is_opened: false,
				is_available: function() {
					return canReachNWDW() ? 'available' : 'unavailable';
				}
			}, { // [65]
				caption: 'Bottle Vendor: Pay 100 rupees',
				is_opened: false,
				is_available: always
			}, { // [66]
				caption: 'Sahasrahla {pendant0}',
				is_opened: false,
				is_available: function() {
					for (var k = 0; k < 10; k++) {
						if (prizes[k] === 1 && items['boss'+k])
							return 'available';
					}
					return 'unavailable';
				}
			}, { // [67]
				caption: 'Ol\' Stumpy',
				is_opened: false,
				is_available: function() {
					if (flags.v311 === 'Y') {
						return (items.moonpearl || glitchLinkState()) && canReachSDW() ? 'available' : 'unavailable';
					}
					return (items.moonpearl || glitchLinkState() || items.mirror) && canReachSDW() ? 'available' : 'unavailable';
				}
			}, { // [68]
				caption: 'Lazy Drunk Kid: Distract him with {bottle} because he can\'t lay off the sauce!',
				is_opened: false,
				is_available: function() {
					return items.bottle ? 'available' : 'unavailable';
				}
			}, { // [69]
				caption: 'Gary\'s Lunchbox (save the frog first)',
				is_opened: false,
				is_available: function() {
					return canReachNWDW() && (items.moonpearl || glitchLinkState()) && (items.glove === 2 || (flags.glitches === 'M' && items.bottle)) ? 'available' : 'unavailable';
				}
			}, { // [70]
				caption: 'Fugitive under the bridge {flippers}',
				is_opened: false,
				is_available: always
			}, { // [71]
				caption: 'Ether Tablet {sword2}{book}',
				is_opened: false,
				is_available: function() {
					return items.book && canReachToH() ?
						(items.sword >= 2 || (flags.swordmode === 'S' && items.hammer)) ?
							items.lantern || items.flute || items.boots || flags.glitches === 'M' ? 'available' : 'darkavailable' :
							'information' :
						'unavailable';
				}
			}, { // [72]
				caption: 'Bombos Tablet {mirror}{sword2}{book}',
				is_opened: false,
				is_available: function() {
					return items.book && ((items.mirror && canReachSDW()) || items.boots || flags.glitches === 'M') ?
						(items.sword >= 2 || (flags.swordmode === 'S' && items.hammer))? 'available' : 'information' :
						'unavailable';
				}
			}, { // [73]
				caption: 'Catfish',
				is_opened: false,
				is_available: function() {
					return canReachNEDW() && (items.moonpearl || glitchLinkState())  && (items.glove || items.boots || flags.glitches === 'M') ?
						'available' : 'unavailable';
				}
			}, { // [74]
				caption: 'King Zora: Pay 500 rupees',
				is_opened: false,
				is_available: always
			}, { // [75]
				caption: 'Lost Old Man {lantern}',
				is_opened: false,
				is_available: function() {
					return canReachWDM() ?
						items.lantern ? 'available' : 'darkavailable' :
						'unavailable';
				}
			}, { // [76]
				caption: 'Witch: Give her {mushroom}',
				is_opened: false,
				is_available: function() {
					return items.mushroom ? 'available' : 'unavailable';
				}
			}, { // [77]
				caption: 'Forest Hideout',
				is_opened: false,
				is_available: always
			}, { // [78]
				caption: 'Lumberjack Tree {agahnim}{boots}',
				is_opened: false,
				is_available: function() {
					return items.agahnim && items.boots ? 'available' : 'information';
				}
			}, { // [79]
				caption: 'Spectacle Rock Cave',
				is_opened: false,
				is_available: function() {
					return canReachWDM() ?
						items.lantern || items.flute || items.boots || flags.glitches === 'M' ? 'available' : 'darkavailable' :
						'unavailable';
				}
			}, { // [80]
				caption: 'South of Grove {mirror}',
				is_opened: false,
				is_available: function() {
					return (items.mirror && canReachSDW()) || (items.boots || flags.glitches === 'M') ? 'available' : 'unavailable';
				}
			}, { // [81]
				caption: 'Graveyard Cliff Cave {mirror}',
				is_opened: false,
				is_available: function() {
					return items.boots || (items.mirror && canReachNWDW() && items.moonpearl) || flags.glitches === 'M' ? 'available' : 'unavailable';
				}
			}, { // [82]
				caption: 'Checkerboard Cave {mirror}',
				is_opened: false,
				is_available: function() {
					return items.glove && (items.boots || flags.glitches === 'M' || (canReachMireArea() && items.mirror)) ? 'available' : 'unavailable';
				}
			}, { // [83]
				caption: '{hammer}{hammer}{hammer}{hammer}{hammer}{hammer}{hammer}{hammer}!!!!!!!!',
				is_opened: false,
				is_available: function() {
					return (items.moonpearl || glitchLinkState()) && (items.glove === 2 || items.boots || flags.glitches === 'M') && items.hammer ? 'available' : 'unavailable';
				}
			}, { // [84]
				caption: 'Library {boots}',
				is_opened: false,
				is_available: function() {
					return items.boots ? 'available' : 'information';
				}
			}, { // [85]
				caption: 'Mushroom',
				is_opened: false,
				is_available: always
			}, { // [86]
				caption: 'Spectacle Rock {mirror}',
				is_opened: false,
				is_available: function() {
					return canReachWDM() ?
						items.mirror || items.boots || flags.glitches === 'M' ?
							items.lantern || items.flute || items.boots || flags.glitches === 'M' ? 'available' : 'darkavailable' :
							'information' :
						'unavailable';
				}
			}, { // [87]
				caption: 'Floating Island {mirror}',
				is_opened: false,
				is_available: function() {
					return canReachEDM() ?
						items.boots || flags.glitches === 'M' || (items.mirror && items.moonpearl && items.glove && canReachDDM()) ?
							items.lantern || items.flute || items.boots || flags.glitches === 'M' ? 'available' : 'darkavailable' :
							'information' :
						'unavailable';
				}
			}, { // [88]
				caption: 'Race Minigame {bomb}/{boots}',
				is_opened: false,
				is_available: always
			}, { // [89]
				caption: 'Desert West Ledge {book}/{mirror}',
				is_opened: false,
				is_available: function() {
					return canReachDP() ? 'available' : 'information';
				}
			}, { // [90]
				caption: 'Lake Hylia Island {mirror}',
				is_opened: false,
				is_available: function() {
					return items.boots || flags.glitches === 'M' || (items.moonpearl && items.mirror && items.flippers && canReachNEDW()) ? 'available' : 'information';
				}
			}, { // [91]
				caption: 'Bumper Cave {cape}',
				is_opened: false,
				is_available: function() {
					return canReachNWDW() ?
						flags.glitches === 'M' || (items.moonpearl && (items.boots || (items.glove && items.cape))) ? 'available' : 'information' :
						'unavailable';
				}
			}, { // [92]
				caption: 'Pyramid',
				is_opened: false,
				is_available: function() {
					return canReachNEDW() ? 'available' : 'unavailable';
				}
			}, { // [93]
				caption: 'Alec Baldwin\'s Dig-a-Thon: Pay 80 rupees',
				is_opened: false,
				is_available: function() {
					return canReachSDW() && (items.moonpearl || glitchLinkState()) ? 'available' : 'unavailable';
				}
			}, { // [94]
				caption: 'Zora River Ledge {flippers}',
				is_opened: false,
				is_available: function() {
					return items.flippers || items.boots ? 'available' : 'information';
				}
			}, { // [95]
				caption: 'Buried Itam {shovel}',
				is_opened: false,
				is_available: function() {
					return items.shovel ? 'available' : 'unavailable';
				}
			}, { // [96]
				caption: 'Escape Sewer Side Room (3) {bomb}/{boots}' + (flags.gametype === 'S' ? '' : ' (may need small key)'),
				is_opened: false,
				is_available: function() {
					if (flags.gametype === 'S') return 'available';
					if (flags.wildkeys || flags.gametype == 'R') {
						if (items.glove) return 'available';
						if (items.smallkeyhalf0 === 1 || flags.gametype == 'R') return canDoTorchDarkRooms() ? 'available' : 'darkavailable';
						return 'unavailable';
					}
					
					return items.glove ? 'available' : canDoTorchDarkRooms() ? 'possible' : 'darkpossible';
				}
			}, { // [97]
				caption: "Castle Secret Entrance (Uncle + 1)",
				is_opened: flags.gametype === 'S',
				is_available: always
			}, { // [98]
				caption: 'Hyrule Castle Dungeon (3)',
				is_opened: flags.gametype === 'S',
				is_available: always
			}, { // [99]
				caption: 'Sanctuary',
				is_opened: flags.gametype === 'S',
				is_available: always
			}, { // [100]
				caption: 'Mad Batter {hammer}/{mirror} + {powder}',
				is_opened: false,
				is_available: function() {
					if (flags.v311 === 'Y') {
						return items.powder && (items.hammer || flags.glitches === 'M' || (items.mirror && (items.moonpearl && ((items.glove === 2 && canReachNWDW()) || (canSpinSpeed() && canReachNEDW()))))) ? 'available' : 'unavailable';
					}
					return items.powder && (items.hammer || items.boots || flags.glitches === 'M' || (items.mirror && (items.moonpearl && ((items.glove === 2 && canReachNWDW()) || (canSpinSpeed() && canReachNEDW()))))) ? 'available' : 'unavailable';
				}
			}, { // [101]
				caption: 'Take the frog home {mirror} / Save+Quit',
				is_opened: false,
				is_available: function() {
					return canReachNWDW() && (((items.moonpearl || glitchLinkState()) && items.glove === 2) || (flags.glitches === 'M' && items.bottle)) ? 'available' : 'unavailable';
				}
			}, { // [102]
				caption: 'Fat Fairy: Buy OJ bomb from Dark Link\'s House after {crystal}5 {crystal}6 (2 items)',
				is_opened: false,
				is_available: function() {
					//crystal check
					var crystal_count = 0;
					for (var k = 0; k < 10; k++) {
						if (prizes[k] === 4 && items['boss'+k])
							crystal_count += 1;
					}
					return (crystal_count >= 2 && canReachSDW() && ((items.moonpearl && items.hammer) || (flags.glitches === 'M' && items.bottle) || (items.mirror && items.agahnim))) || (items.mirror && (items.boots || (flags.glitches === 'M'))) ? 'available' : 'unavailable';
				}
			}, { // [103]
				caption: 'Master Sword Pedestal {pendant0}{pendant1}{pendant2} (can check with {book})',
				is_opened: false,
				is_available: function() {
					var pendant_count = 0;
					for (var k = 0; k < 10; k++) {
						if ((prizes[k] === 1 || prizes[k] === 2) && items['boss'+k]) {
							if (++pendant_count === 3) return 'available';
						}
					}
					return items.book ? 'information' : 'unavailable';
				}
			}, { // [104]
				caption: 'Escape Sewer Dark Room {lantern}',
				is_opened: flags.gametype === 'S',
				is_available: function() {
					return flags.gametype === 'S' || canDoTorchDarkRooms() ? 'available' : 'darkavailable';
				}
			}, { // [105]
				caption: 'Waterfall of Wishing (2) {flippers}',
				is_opened: false,
				is_available: function() {
					return items.flippers || items.boots || items.moonpearl ? 'available' : 'unavailable';
				}
			}, { // [106]
				caption: 'Castle Tower',
				is_opened: false,
				is_available: function() {
					//return items.sword >= 2 || (flags.swordmode === 'S' && items.hammer) || items.cape ? 'available' : 'unavailable';
					if(items.sword < 2 && (flags.swordmode != 'S' || !items.hammer) && !items.cape)
						return 'unavailable';
					return 'available';
				}
			}, { // [107]
				caption: 'Castle Tower (small key)',
				is_opened: false,
				is_available: function() {
					if(items.sword < 2 && (flags.swordmode != 'S' || !items.hammer) && !items.cape)
						return 'unavailable';
					return items.smallkeyhalf1 > 0 || flags.gametype === 'R' ? items.lantern ? 'available' : 'darkavailable' : 'unavailable';
				}
			}, { // [108]
				caption: 'Lake Hylia Shop (3)',
				is_opened: false,
				is_available: always
			}, { // [109]
				caption: 'Kakariko Shop (3)',
				is_opened: false,
				is_available: always
			}, { // [110]
				caption: 'Paradox Shop (3) {bomb}',
				is_opened: false,
				is_available: function() {
					return items.bomb && canReachEDM() ?
						items.lantern || items.flute || items.boots ? 'available' : 'darkavailable' :
						'unavailable';
				}
			}, { // [111]
				caption: 'Dark Lake Hylia Shop (3)',
				is_opened: false,
				is_available: function() {
					return canReachSDW() ? 'available' : 'unavailable';
				}
			}, { // [112]
				caption: 'Village of Outcasts Shop (3) {hammer}',
				is_opened: false,
				is_available: function() {
					return canReachNWDW() && items.moonpearl && items.hammer ? 'available' : 'unavailable';
				}
			}, { // [113]
				caption: 'Dark Death Mountain Shop (3)',
				is_opened: false,
				is_available: function() {
					return canReachDDM() ?
						items.lantern || items.flute || items.boots ? 'available' : 'darkavailable' :
						'unavailable';
				}
			}, { // [114]
				caption: 'Dark Potion Shop (3)',
				is_opened: false,
				is_available: function() {
					return canReachNEDW() ? 'available' : 'unavailable';
				}
			}, { // [115]
				caption: 'Dark Lumberjack Shop (3)',
				is_opened: false,
				is_available: function() {
					return canReachNWDW() ? 'available' : 'unavailable';
				}
			}, { // [116]
				caption: 'Curiosity Shop (3)',
				is_opened: false,
				is_available: function() {
					return canReachNWDW() ? 'available' : 'unavailable';
				}
			}, { // [117]
				caption: 'Potion Shop (3)',
				is_opened: false,
				is_available: always
			}, { // [118]
				caption: 'Pond of Happiness (2)',
				is_opened: false,
				is_available: always
			}, { // [119]
				caption: 'Bomb Shop (2)',
				is_opened: false,
				is_available: function() {
					return canReachSDW() ? 'available' : 'unavailable';
				}

			}];
		}
		
		// Unsupported glitch mode, with minimal checks for availability aside from hard-locked locations
		else if (flags.glitches != "N" && flags.glitches != 'O' && flags.glitches != 'H' && flags.glitches != 'M')
		{
			window.dungeons = [{ // [0]
				caption: 'Eastern Palace',
				is_beaten: false,
				is_beatable: function() { return MinimalBoss(0); },
				can_get_chest: function() { return 'available'; }
			}, { // [1]
				caption: 'Desert Palace {book}',
				is_beaten: false,
				is_beatable: function() { return MinimalBoss(1); },
				can_get_chest: function() { return 'available'; }
			}, { // [2]
				caption: 'Tower of Hera {hammer} [{hookshot}/{glove2}]',
				is_beaten: false,
				is_beatable: function() { return MinimalBoss(2); },
				can_get_chest: function() { return 'available'; }
			}, { // [3]
				caption: 'Palace of Darkness',
				is_beaten: false,
				is_beatable: function() { return MinimalBoss(3); },
				can_get_chest: function() { return 'available'; }
			}, { // [4]
				caption: 'Swamp Palace {mirror} {flippers}',
				is_beaten: false,
				is_beatable: function() { return MinimalBoss(4); },
				can_get_chest: function() { return 'available'; }
			}, { // [5]
				caption: 'Skull Woods',
				is_beaten: false,
				is_beatable: function() { return MinimalBoss(5); },
				can_get_chest: function() { return 'available'; }
			}, { // [6]
				caption: 'Thieves\' Town',
				is_beaten: false,
				is_beatable: function() { return MinimalBoss(6); },
				can_get_chest: function() { return 'available'; }
			}, { // [7]
				caption: 'Ice Palace {flippers} [{firerod}/{bombos}]',
				is_beaten: false,
				is_beatable: function() { return MinimalBoss(7); },
				can_get_chest: function() { return 'available'; }
			}, { // [8]
				caption: 'Misery Mire {medallion0} [{boots}/{hookshot}',
				is_beaten: false,
				is_beatable: function() { return MinimalBoss(8); },
				can_get_chest: function() { return 'available'; }
			}, { // [9]
				caption: 'Turtle Rock {medallion0}/{mirror}',
				is_beaten: false,
				is_beatable: function() { return MinimalBoss(9); },
				can_get_chest: function() { return 'available'; }
			}, { // [10]
				caption: 'Ganon\'s Castle (Crystals)',
				is_beaten: false,
				is_beatable: function() {
					if ((crystalCheck() < flags.ganonvulncount && flags.goals != 'A') || (!items.agahnim2 && flags.goals != 'F') || (flags.goals === 'A' && (!items.agahnim || !allDungeonCheck()))) return 'unavailable';
					if ((flags.swordmode != 'S' && items.sword < 2) || (flags.swordmode === 'S' && !items.hammer) || (!items.lantern && !items.firerod)) return 'unavailable';
					if (flags.goals === 'F' && (items.sword > 1 || flags.swordmode === 'S' && items.hammer) && (items.lantern || items.firerod)) return 'available';
					return 'available';
				},
				can_get_chest: function() { return 'available'; }
			}, { // [11]
				caption: 'Hyrule Castle',//Only used with Entrance or Door Shuffle
				is_beaten: false,
				is_beatable: function() {
					return items.chest11 ?window.dungeons[11].can_get_chest() :'opened';
				},
				can_get_chest: function() { return 'available'; }
			}, { // [12]
				caption: 'Castle Tower',//Only used with Entrance or Door Shuffle
				is_beaten: false,
				is_beatable: function() {
					return window.agahnim.is_available();
				},
				can_get_chest: function() { return 'available'; }
			}];

			window.agahnim = {
				caption: 'Agahnim',
				is_available: always
			};

			//define overworld chests
			window.chests = [{ // [0]
				caption: 'King\'s Tomb {boots} + {glove2}',
				is_opened: false,
				is_available: always
			}, { // [1]
				caption: 'Light World Swamp (2)',
				is_opened: false,
				is_available: always
			}, { // [2]
				caption: 'Stoops Lonk\'s Hoose',
				is_opened: false,
				is_available: always
			}, { // [3]
				caption: 'Spiral Cave',
				is_opened: false,
				is_available: always
			}, { // [4]
				caption: 'Mimic Cave',
				is_opened: false,
				is_available: always
			}, { // [5]
				caption: 'Tavern',
				is_opened: false,
				is_available: always
			}, { // [6]
				caption: 'Chicken House {bomb}',
				is_opened: false,
				is_available: always
			}, { // [7]
				caption: 'Bombable Hut {bomb}',
				is_opened: false,
				is_available: always
			}, { // [8]
				caption: 'C House',
				is_opened: false,
				is_available: always
			}, { // [9]
				caption: 'Aginah\'s Cave {bomb}',
				is_opened: false,
				is_available: always
			}, { // [10]
				caption: 'Mire Shed (2)',
				is_opened: false,
				is_available: always
			}, { // [11]
				caption: 'Super Bunny Chests (2)',
				is_opened: false,
				is_available: always
			}, { // [12]
				caption: 'Sahasrahla\'s Hut (3) {bomb}/{boots}',
				is_opened: false,
				is_available: always
			}, { // [13]
				caption: 'Byrna Spike Cave',
				is_opened: false,
				is_available: always
			}, { // [14]
				caption: 'Kakariko Well (4 + {bomb})',
				is_opened: false,
				is_available: always
			}, { // [15]
				caption: 'Thieve\'s Hut (4 + {bomb})',
				is_opened: false,
				is_available: always
			}, { // [16]
				caption: 'Hype Cave! {bomb} (NPC + 4 {bomb})',
				is_opened: false,
				is_available: always
			}, { // [17]
				caption: 'Paradox Cave (5 + 2 {bomb})',
				is_opened: false,
				is_available: always
			}, { // [18]
				caption: 'West of Sanctuary {boots}',
				is_opened: false,
				is_available: always
			}, { // [19]
				caption: 'Minimoldorm Cave (NPC + 4) {bomb}',
				is_opened: false,
				is_available: always
			}, { // [20]
				caption: 'Ice Rod Cave {bomb}',
				is_opened: false,
				is_available: always
			}, { // [21]
				caption: 'Hookshot Cave (bottom chest) {hookshot}/{boots}',
				is_opened: false,
				is_available: always
			}, { // [22]
				caption: 'Hookshot Cave (3 top chests) {hookshot}',
				is_opened: false,
				is_available: always
			}, { // [23]
				caption: 'Lost Woods Hideout Tree',
				is_opened: false,
				is_available: always
			}, { // [24]
				caption: 'Death Mountain Bonk Rocks',
				is_opened: false,
				is_available: always
			}, { // [25]
				caption: 'Mountain Entry Pull Tree',
				is_opened: false,
				is_available: function() {
						for(var k = 0; k < 10; k++)
							if(prizes[k] === 1 && items['boss'+k])
								return 'available';
						return 'unavailable';
				}
			}, { // [26]
				caption: 'Mountain Entry Southeast Tree',
				is_opened: false,
				is_available: always
			}, { // [27]
				caption: 'Lost Woods Pass West Tree',
				is_opened: false,
				is_available: function() {
					return items.bottle ? 'available' : 'unavailable'
				}
			}, { // [28]
				caption: 'Kakariko Portal Tree',
				is_opened: false,
				is_available: always
			}, { // [29]
				caption: 'Fortune Bonk Rocks',
				is_opened: false,
				is_available: always
			}, { // [30]
				caption: 'Kakariko Pond Tree',
				is_opened: false,
				is_available: function() {
					return items.book ? (items.sword >= 2 || (flags.swordmode === 'S' && items.hammer) ? 'available' : 'information') :
						'unavailable';
				}
			}, { // [31]
				caption: 'Bonk Rocks Tree',
				is_opened: false,
				is_available: function() {
					return items.book ? (items.sword >= 2 || (flags.swordmode === 'S' && items.hammer) ? 'available' : 'information') :
						'unavailable';
				}
			}, { // [32]
				caption: 'Sanctuary Tree',
				is_opened: false,
				is_available: always
			}, { // [33]
				caption: 'River Bend West Tree',
				is_opened: false,
				is_available: always
			}, { // [34]
				caption: 'River Bend East Tree',
				is_opened: false,
				is_available: always
			}, { // [35]
				caption: 'Blinds Hideout Tree',
				is_opened: false,
				is_available: function() {
					return items.mushroom ? 'available' : 'unavailable'
				}
			}, { // [36]
				caption: 'Kakariko Welcome Tree',
				is_opened: false,
				is_available: always
			}, { // [37]
				caption: 'Forgotten Forest Southwest Tree',
				is_opened: false,
				is_available: function() {
					return items.agahnim ? 'available' : 'information';
				}
			}, { // [38]
				caption: 'Forgotten Forest Central Tree',
				is_opened: false,
				is_available: always
			}, { // [39]
				caption: 'Hyrule Castle Tree',
				is_opened: false,
				is_available: always
			}, { // [40]
				caption: 'Wooden Bridge Tree',
				is_opened: false,
				is_available: always
			}, { // [41]
				caption: 'Eastern Palace Tree',
				is_opened: false,
				is_available: always
			}, { // [42]
				caption: 'Flute Boy South Tree',
				is_opened: false,
				is_available: always
			}, { // [43]
				caption: 'Flute Boy East Tree',
				is_opened: false,
				is_available: function() {
					return items.boots ? 'available' : 'information';
				}
			}, { // [44]
				caption: 'Central Bonk Rocks Tree',
				is_opened: false,
				is_available: always
			}, { // [45]
				caption: 'Tree Line Tree 2',
				is_opened: false,
				is_available: always
			}, { // [46]
				caption: 'Tree Line Tree 4',
				is_opened: false,
				is_available: always
			}, { // [47]
				caption: 'Flute Boy Approach South Tree',
				is_opened: false,
				is_available: always
			}, { // [48]
				caption: 'Flute Boy Approach North Tree',
				is_opened: false,
				is_available: always
			}, { // [49]
				caption: 'Dark Lumberjack Tree',
				is_opened: false,
				is_available: always
			}, { // [50]
				caption: 'Dark Fortune Bonk Rocks (2)',
				is_opened: false,
				is_available: always
			}, { // [51]
				caption: 'Dark Graveyard West Bonk Rock',
				is_opened: false,
				is_available: always
			}, { // [52]
				caption: 'Dark Graveyard North Bonk Rocks',
				is_opened: false,
				is_available: always
			}, { // [53]
				caption: 'Dark Graveyard Tomb Bonk Rocks',
				is_opened: false,
				is_available: always
			}, { // [54]
				caption: 'Qirn Jump West Tree',
				is_opened: false,
				is_available: function() {
					return items.shovel ? 'available' : 'unavailable';
				}
			}, { // [55]
				caption: 'Qirn Jump East Tree',
				is_opened: false,
				is_available: always
			}, { // [56]
				caption: 'Dark Witch Tree',
				is_opened: false,
				is_available: always
			}, { // [57]
				caption: 'Pyramid Tree',
				is_opened: false,
				is_available: always
			}, { // [58]
				caption: 'Palace of Darkness Tree',
				is_opened: false,
				is_available: always
			}, { // [59]
				caption: 'Dark Tree Line Tree 2',
				is_opened: false,
				is_available: always
			}, { // [60]
				caption: 'Dark Tree Line Tree 3',
				is_opened: false,
				is_available: always
			}, { // [61]
				caption: 'Dark Tree Line Tree 4',
				is_opened: false,
				is_available: always
			}, { // [62]
				caption: 'Hype Cave Statue',
				is_opened: false,
				is_available: function() {
					var pendant_count = 0;
					for(var k = 0; k < 10; k++)
						if((prizes[k] === 1 || prizes[k] === 2) && items['boss'+k])
							if(++pendant_count === 3)
								return 'available';
					return items.book ? 'information' : 'unavailable';
				}
			}, { // [63]
				caption: 'Cold Fairy Statue',
				is_opened: false,
				is_available: always
			}, { // [64]
				caption: 'Treasure Chest Minigame: Pay 30 rupees',
				is_opened: false,
				is_available: always
			}, { // [65]
				caption: 'Bottle Vendor: Pay 100 rupees',
				is_opened: false,
				is_available: always
			}, { // [66]
				caption: 'Sahasrahla {pendant0}',
				is_opened: false,
				is_available: always
			}, { // [67]
				caption: 'Ol\' Stumpy',
				is_opened: false,
				is_available: always
			}, { // [68]
				caption: 'Lazy Drunk Kid: Distract him with {bottle} because he can\'t lay off the sauce!',
				is_opened: false,
				is_available: always
			}, { // [69]
				caption: 'Gary\'s Lunchbox (save the frog first)',
				is_opened: false,
				is_available: always
			}, { // [70]
				caption: 'Fugitive under the bridge {flippers}',
				is_opened: false,
				is_available: always
			}, { // [71]
				caption: 'Ether Tablet {sword2}{book}',
				is_opened: false,
				is_available: always
			}, { // [72]
				caption: 'Bombos Tablet {sword2}{book}',
				is_opened: false,
				is_available: always
			}, { // [73]
				caption: 'Catfish',
				is_opened: false,
				is_available: always
			}, { // [74]
				caption: 'King Zora: Pay 500 rupees',
				is_opened: false,
				is_available: always
			}, { // [75]
				caption: 'Lost Old Man {lantern}',
				is_opened: false,
				is_available: always
			}, { // [76]
				caption: 'Witch: Give her {mushroom}',
				is_opened: false,
				is_available: always
			}, { // [77]
				caption: 'Forest Hideout',
				is_opened: false,
				is_available: always
			}, { // [78]
				caption: 'Lumberjack Tree {agahnim}{boots}',
				is_opened: false,
				is_available: always
			}, { // [79]
				caption: 'Spectacle Rock Cave',
				is_opened: false,
				is_available: always
			}, { // [80]
				caption: 'South of Grove',
				is_opened: false,
				is_available: always
			}, { // [81]
				caption: 'Graveyard Cliff Cave',
				is_opened: false,
				is_available: always
			}, { // [82]
				caption: 'Checkerboard Cave',
				is_opened: false,
				is_available: always
			}, { // [83]
				caption: '{hammer}{hammer}{hammer}{hammer}{hammer}{hammer}{hammer}{hammer}!!!!!!!!',
				is_opened: false,
				is_available: always
			}, { // [84]
				caption: 'Library {boots}',
				is_opened: false,
				is_available: always
			}, { // [85]
				caption: 'Mushroom',
				is_opened: false,
				is_available: always
			}, { // [86]
				caption: 'Spectacle Rock',
				is_opened: false,
				is_available: always
			}, { // [87]
				caption: 'Floating Island',
				is_opened: false,
				is_available: always
			}, { // [88]
				caption: 'Race Minigame {bomb}/{boots}',
				is_opened: false,
				is_available: always
			}, { // [89]
				caption: 'Desert West Ledge {book}',
				is_opened: false,
				is_available: always
			}, { // [90]
				caption: 'Lake Hylia Island {flippers}',
				is_opened: false,
				is_available: always
			}, { // [91]
				caption: 'Bumper Cave {cape}{mirror}',
				is_opened: false,
				is_available: always
			}, { // [92]
				caption: 'Pyramid',
				is_opened: false,
				is_available: always
			}, { // [93]
				caption: 'Alec Baldwin\'s Dig-a-Thon: Pay 80 rupees',
				is_opened: false,
				is_available: always
			}, { // [94]
				caption: 'Zora River Ledge {flippers}',
				is_opened: false,
				is_available: always
			}, { // [95]
				caption: 'Buried Item {shovel}',
				is_opened: false,
				is_available: always
			}, { // [96]
				caption: 'Escape Sewer Side Room (3) {bomb}/{boots} (may need small key)',
				is_opened: false,
				is_available: always
			}, { // [97]
				caption: "Castle Secret Entrance (Uncle + 1)",
				is_opened: false,
				is_available: always
			}, { // [98]
				caption: 'Hyrule Castle Dungeon (3)',
				is_opened: false,
				is_available: always
			}, { // [99]
				caption: 'Sanctuary',
				is_opened: false,
				is_available: always
			}, { // [100]
				caption: 'Mad Batter {hammer} + {powder}',
				is_opened: false,
				is_available: always
			}, { // [101]
				caption: 'Take the frog home',
				is_opened: false,
				is_available: always
			}, { // [102]
				caption: 'Fat Fairy: Buy OJ bomb from Light Link\'s House after {crystal}5 {crystal}6 (2 items)',
				is_opened: false,
				is_available: always
			}, { // [103]
				caption: 'Master Sword Pedestal {pendant0}{pendant1}{pendant2} (can check with {book})',
				is_opened: false,
				is_available: always
			}, { // [104]
				caption: 'Escape Sewer Dark Room {lantern}',
				is_opened: false,
				is_available: always
			}, { // [105]
				caption: 'Waterfall of Wishing (2) {flippers}',
				is_opened: false,
				is_available: always
			}, { // [106]
				caption: 'Castle Tower',
				is_opened: false,
				is_available: always
			}, { // [107]
				caption: 'Castle Tower (small key)',
				is_opened: false,
				is_available: always
			}, { // [108]
				caption: 'Lake Hylia Shop (3)',
				is_opened: false,
				is_available: always
			}, { // [109]
				caption: 'Kakariko Shop (3)',
				is_opened: false,
				is_available: always
			}, { // [110]
				caption: 'Paradox Shop (3) {bomb}',
				is_opened: false,
				is_available: always
			}, { // [111]
				caption: 'Dark Lake Hylia Shop (3)',
				is_opened: false,
				is_available: always
			}, { // [112]
				caption: 'Village of Outcasts Shop (3) {hammer}',
				is_opened: false,
				is_available: always
			}, { // [113]
				caption: 'Dark Death Mountain Shop (3)',
				is_opened: false,
				is_available: always
			}, { // [114]
				caption: 'Dark Potion Shop (3)',
				is_opened: false,
				is_available: always
			}, { // [115]
				caption: 'Dark Lumberjack Shop (3)',
				is_opened: false,
				is_available: always
			}, { // [116]
				caption: 'Curiosity Shop (3)',
				is_opened: false,
				is_available: always
			}, { // [117]
				caption: 'Potion Shop (3)',
				is_opened: false,
				is_available: always
			}, { // [118]
				caption: 'Pond of Happiness (2)',
				is_opened: false,
				is_available: always
			}, { // [119]
				caption: 'Bomb Shop (2)',
				is_opened: false,
				is_available: always

			}];
		}
		
		
		//Is Inverted Mode
		else if (flags.gametype === "I")
		{
			window.dungeons = [{ // [0]
				caption: 'Eastern Palace',
				is_beaten: false,
				is_beatable: function() {
					if (!canReachLightWorld()) return 'unavailable';
					var doorcheck = window.doorCheck(0,false,true,true,['hookshot','bow'],'boss');
					if(doorcheck)
						return doorcheck;
					return window.EPBoss();
				},
				can_get_chest: function() {
					if (!canReachLightWorld()) return 'unavailable';
					var doorcheck = window.doorCheck(0,false,true,true,['hookshot','bow'],'item');
					if(doorcheck)
						return doorcheck;
					return window.EPChests();
				}
			}, { // [1]
				caption: 'Desert Palace {book}',
				is_beaten: false,
				is_beatable: function() {
					//if (!canReachLightWorldBunny() || !items.book) return 'unavailable';
					if (!canReachLightWorld() || !items.book) return 'unavailable';
					var doorcheck = window.doorCheck(1,false,false,false,[(!flags.wildkeys && flags.gametype != 'R') || !flags.wildbigkeys ? 'boots' : '','glove','firesource','killbomb'],'boss');
					if(doorcheck)
						return doorcheck;
					return window.DPBoss();
				},
				can_get_chest: function() {
					//if (!items.book || !canReachLightWorldBunny()) return 'unavailable';
					if (!canReachLightWorld() || !items.book) return 'unavailable';
					var doorcheck = window.doorCheck(1,false,false,false,['boots','glove','firesource','killbomb'],'item');
					if(doorcheck)
						return doorcheck;
					return window.DPChests();
				}
			}, { // [2]
				caption: 'Tower of Hera {hammer} [{hookshot}/{glove2}]',
				is_beaten: false,
				is_beatable: function() {
					if(!(items.glove || activeFlute()) || !items.moonpearl || !items.hammer || !(items.hookshot || items.glove === 2)) return 'unavailable';
					var doorcheck = window.doorCheck(2,!activeFlute() && !items.lantern,false,false,[(!flags.wildkeys && flags.gametype != 'R') || !flags.wildbigkeys ? 'firesource' : ''],'boss');
					if(doorcheck)
						return doorcheck;
					return window.HeraBoss();
				},
				can_get_chest: function() {
					if(!(items.glove || activeFlute()) || !items.moonpearl || !items.hammer || !(items.hookshot || items.glove === 2)) return 'unavailable';
					var doorcheck = window.doorCheck(2,!activeFlute() && !items.lantern,false,false,['firesource'],'item');
					if(doorcheck)
						return doorcheck;
					return window.HeraChests();
				}
			}, { // [3]
				caption: 'Palace of Darkness',
				is_beaten: false,
				is_beatable: function() {
					if(!canReachPyramid()) return 'unavailable';
					var doorcheck = window.doorCheck(3,false,true,true,['boots','hammer','bow','bomb'],'boss');
					if(doorcheck)
						return doorcheck;
					return window.PoDBoss();
				},
				can_get_chest: function() {
					if (!canReachPyramid()) return 'unavailable';
					var doorcheck = window.doorCheck(3,false,true,true,['boots','hammer','bow','bomb'],'item');
					if(doorcheck)
						return doorcheck;
					return window.PoDChests();
				}
			}, { // [4]
				caption: 'Swamp Palace {mirror} {flippers}',
				is_beaten: false,
				is_beatable: function() {
					if (!items.moonpearl || !canReachLightWorldBunny()) return 'unavailable';
					var doorcheck = window.doorCheck(4,false,false,false,['flippers','mirror','hookshot','hammer','bomb'],'boss');
					if(doorcheck)
						return doorcheck;
					return window.SPBoss();
				},
				can_get_chest: function() {
					if (!items.moonpearl || !canReachLightWorldBunny()) return 'unavailable';
					var doorcheck = window.doorCheck(4,false,false,false,['flippers','mirror','hookshot','hammer','bomb'],'item');
					if(doorcheck)
						return doorcheck;
					return window.SPChests();
				}
			}, { // [5]
				caption: 'Skull Woods',
				is_beaten: false,
				is_beatable: function() {
					var doorcheck = window.doorCheck(5,false,false,false,['firerod','swordorswordless','mirrorskull','bomb'],'boss');
					if(doorcheck)
						return doorcheck;
					return window.SWBoss();
				},
				can_get_chest: function() {
					var doorcheck = window.doorCheck(5,false,false,false,['firerod','swordorswordless','mirrorskull','bomb'],'item');
					if(doorcheck)
						return doorcheck;
					return window.SWChests();
				}
			}, { // [6]
				caption: 'Thieves\' Town',
				is_beaten: false,
				is_beatable: function() {
					var doorcheck = window.doorCheck(6,false,false,false,[(!flags.wildkeys && flags.gametype != 'R') || !flags.wildbigkeys ? 'hammer' : '','glove','bomb'],'boss');
					if(doorcheck)
						return doorcheck;
					return window.TTBoss();
				},
				can_get_chest: function() {
					var doorcheck = window.doorCheck(6,false,false,false,['hammer','glove','bomb'],'item');
					if(doorcheck)
						return doorcheck;
					return window.TTChests();
				}
			}, { // [7]
				caption: 'Ice Palace {flippers} [{firerod}/{bombos}]',
				is_beaten: false,
				is_beatable: function() {
					if (!items.flippers) return 'unavailable';
					var doorcheck = window.doorCheck(7,false,false,false,['freezor','hammer','glove','hookshot','somaria','bomb'],'boss');
					if(doorcheck)
						return doorcheck;
					return window.IPBoss();
				},
				can_get_chest: function() {
					if (!items.flippers) return 'unavailable';
					var doorcheck = window.doorCheck(7,false,false,false,['freezor','hammer','glove','hookshot','somaria','bomb'],'item');
					if(doorcheck)
						return doorcheck;
					return window.IPChests();
				}
			}, { // [8]
				caption: 'Misery Mire {medallion0} [{boots}/{hookshot}',
				is_beaten: false,
				is_beatable: function() {
					if ((!activeFlute() && !(items.mirror && canReachLightWorldBunny())) || medallionCheck(0) === 'unavailable') return 'unavailable';
					var doorcheck = window.doorCheck(8,false,true,false,['hookshot','firesource','somaria','bomb'],'boss');
					if(doorcheck)
					{
						if(doorcheck === 'unavailable')
							return 'unavailable';
						if(medallionCheck(0) === 'possible' && doorcheck === 'available')
							return 'possible';
						if(medallionCheck(0) === 'possible' && doorcheck === 'darkavailable')
							return 'darkpossible';
						return doorcheck;
					}
					if (!items.bigkey8 || !items.somaria) return 'unavailable';
					return window.MMBoss(medallion_check(0));
				},
				can_get_chest: function() {
					if ((!activeFlute() && !(items.mirror && canReachLightWorldBunny())) || medallionCheck(0) === 'unavailable') return 'unavailable';
					var doorcheck = window.doorCheck(8,false,true,false,['hookshot','firesource','somaria','bomb'],'item');
					if(doorcheck)
					{
						if(doorcheck === 'unavailable')
							return 'unavailable';
						if(medallionCheck(0) === 'possible' && doorcheck === 'available')
							return 'possible';
						if(medallionCheck(0) === 'possible' && doorcheck === 'darkavailable')
							return 'darkpossible';
						return doorcheck;
					}
					return window.MMChests(medallion_check(0));
				}
			}, { // [9]
				caption: 'Turtle Rock {medallion0}/{mirror}',
				is_beaten: false,
				is_beatable: function() {
					if (!(items.glove || activeFlute())) return 'unavailable';
					if(flags.doorshuffle != 'N')
					{
						if(medallionCheck(1) === 'unavailable' && (!items.mirror || ((!items.hookshot || !items.moonpearl) && items.glove < 2))) return 'unavailable';
						var doorcheck = window.doorCheck(9,!items.flute && !items.lantern,true,false,['somaria','firerod',(!flags.wildkeys && flags.gametype != 'R') || !flags.wildbigkeys ? 'laserbridge' : '','bombdash'],'boss');
						if(doorcheck === 'unavailable')
							return 'unavailable';
						if((medallionCheck(1) === 'possible' || (!items.mirror && !items.bomb)) && doorcheck === 'available')
							return 'possible';
						if((medallionCheck(1) === 'possible' || (!items.mirror && !items.bomb)) && doorcheck === 'darkavailable')
							return 'darkpossible';
						return doorcheck;
					}
					if (!items.somaria) return 'unavailable';
					//First, check for back door access through mirror, it has logic priority
					if (items.mirror && ((items.hookshot && items.moonpearl) || (items.glove === 2))) {
						return window.TRBackBoss();
					//If not, go through normal front door access
					} else {
						if (!items.bigkey9 || medallionCheck(1) === 'unavailable') return 'unavailable';
						var frontcheck = window.TRFrontBoss(medallion_check(1));
						if (frontcheck === 'available') {
							//Only list as fully available if both front and back entrances are available
							if (items.glove === 2 && items.mirror) {
								return 'available';
							} else {
								return 'possible';
							}
						}
						return frontcheck;
					}
				},
				can_get_chest: function() {
					if (!(items.glove || activeFlute())) return 'unavailable';
					if(flags.doorshuffle != 'N')
					{
						if(medallionCheck(1) === 'unavailable' && (!items.mirror || ((!items.hookshot || !items.moonpearl) && items.glove < 2))) return 'unavailable';
						var doorcheck = window.doorCheck(9,!items.flute && !items.lantern,true,false,['somaria','firerod','laserbridge','bombdash'],'item');
						if(doorcheck === 'unavailable')
							return 'unavailable';
							if((medallionCheck(1) === 'possible' || (!items.mirror && !items.bomb)) && doorcheck === 'available')
								return 'possible';
							if((medallionCheck(1) === 'possible' || (!items.mirror && !items.bomb)) && doorcheck === 'darkavailable')
								return 'darkpossible';
						return doorcheck;
					}
					//First, check for back door access through mirror, it has logic priority
					if (items.mirror && ((items.hookshot && items.moonpearl) || (items.glove === 2))) {
						return window.TRBackChests();
					//If not, go through normal front door access
					} else {
						if (medallionCheck(1) === 'unavailable' || !items.somaria) return 'unavailable';
						var frontcheck = medallion_check(1);
						if (frontcheck === 'available') {
							//Only list as fully available if both front and back entrances are available
							if (items.glove === 2 && items.mirror) {
								return 'available';
							} else {
								return 'possible';
							}
						}
						return frontcheck;
						//return window.TRFrontChests(medallion_check(1));//Note: This assumes the key layout allows for clearing it in this direction
					}
				}
			}, { // [10]
				caption: 'Ganon\'s Castle (Crystals)',
				is_beaten: false,
				is_beatable: function() {
					if ((crystalCheck() < flags.ganonvulncount && flags.goals != 'A') || ((crystalCheck() < flags.opentowercount || !items.agahnim2) && flags.goals != 'F') || !canReachLightWorld() || (flags.goals === 'A' && (!items.agahnim || !allDungeonCheck()))) return 'unavailable';
					if ((flags.swordmode != 'S' && items.sword < 2) || (flags.swordmode === 'S' && !items.hammer) || (!items.lantern && !items.firerod)) return 'unavailable';
					if (flags.goals === 'F' && (items.sword > 1 || (flags.swordmode === 'S' && items.hammer)) && (items.lantern || items.firerod)) return 'available';
					if(flags.doorshuffle != 'N')
					{
						var doorcheck = window.doorCheck(10,false,false,false,['hammer','firerod','hookshot','boomerang','somaria',(!flags.wildkeys && flags.gametype != 'R') || !flags.wildbigkeys ? 'boots' : '','bow',flags.bossshuffle === 'N' ? '' : 'icerod','bomb'],'boss');
						if(doorcheck)
							return doorcheck;
					}
					if(flags.doorshuffle != 'N')
					{
						var doorcheck = items.agahnim && items.mirror ? 'available' : window.doorCheck(11,false,false,true,['glove','killbomb','bombdash'],'connector');
						if(doorcheck === 'possible' || doorcheck === 'unavailable')
							return doorcheck;
						if(doorcheck === 'darkpossible')
						{
							doorcheck = window.doorCheck(10,false,false,false,['hammer','firerod','hookshot','boomerang','somaria',(!flags.wildkeys && flags.gametype != 'R') || !flags.wildbigkeys ? 'boots' : '','bow',flags.bossshuffle === 'N' ? '' : 'icerod','bomb'],'boss');
							if(doorcheck === 'darkavailable')
								return 'darkpossible';
							return doorcheck;
						}
						return window.doorCheck(10,false,false,false,['hammer','firerod','hookshot','boomerang','somaria',(!flags.wildkeys && flags.gametype != 'R') || !flags.wildbigkeys ? 'boots' : '','bow',flags.bossshuffle === 'N' ? '' : 'icerod','bomb'],'boss');
					}
					return window.GTBoss();			
				},
				can_get_chest: function() {
					if (!canReachLightWorld()) return 'unavailable';
					if (flags.opentowercount == 8) return 'possible';
					if (crystalCheck() < 7 && crystalCheck() < flags.opentowercount) return 'unavailable';
					if(flags.doorshuffle != 'N')
					{
						var doorcheck = items.agahnim && items.mirror ? 'available' : window.doorCheck(11,false,false,true,['glove','killbomb','bombdash'],'connector');
						if(doorcheck === 'possible' || doorcheck === 'unavailable')
							return doorcheck;
						if(doorcheck === 'darkpossible')
						{
							doorcheck = window.doorCheck(10,true,false,false,['hammer','firerod','hookshot','boomerang','somaria','boots','bow',flags.bossshuffle === 'N' ? '' : 'icerod','bomb'],'item');
							if(doorcheck === 'darkavailable')
								return 'darkpossible';
							return doorcheck;
						}
						return window.doorCheck(10,doorcheck.startsWith('dark'),false,false,['hammer','firerod','hookshot','boomerang','somaria','boots','bow',flags.bossshuffle === 'N' ? '' : 'icerod','bomb'],'item');
					}
					return window.GTChests();
				}
			}, { // [11]
				caption: 'Hyrule Castle',//Only used with Entrance or Door Shuffle
				is_beaten: false,
				is_beatable: function() {
					return items.chest11 ?window.dungeons[11].can_get_chest() :'opened';
				},
				can_get_chest: function() {
					if(!canReachLightWorld())
						return 'unavailable';
					return window.doorCheck(11,false,false,true,['glove','killbomb','bombdash'],'item');
				}
			}, { // [12]
				caption: 'Castle Tower',//Only used with Entrance or Door Shuffle
				is_beaten: false,
				is_beatable: function() {
					return window.agahnim.is_available();
				},
				can_get_chest: function() {
					if(!items.glove && !activeFlute())
						return 'unavailable';
					return window.doorCheck(12,!items.lantern && !activeFlute(),true,true,['kill','swordorswordless'],'item');
				}
			}];

			window.agahnim = {
				caption: 'Agahnim',
				is_available: function() {
					if(!items.glove && !activeFlute())
						return 'unavailable';
					if(!items.bomb && !melee_bow() && !cane() && !items.firerod)
						return 'unavailable';
					if(flags.doorshuffle === 'B')
					{
						if(!melee_bow() && !cane() && !items.firerod)
							return 'unavailable';
						return (items.sword || (flags.swordmode === 'S' && (items.hammer || items.net)/* && agatowerweapon()*/)) && (items.smallkeyhalf1 === 2 || flags.gametype === 'R') ? (items.lantern ? 'available' : 'darkavailable') : 'unavailable';
					}
					if(flags.doorshuffle === 'C')
					{
						if(!items.sword && !items.hammer && !items.net)
							return 'unavailable';
						return window.doorCheck(12,!items.lantern && !activeFlute(),true,true,[],'boss');
					}
					if (flags.wildkeys) {
						return (items.sword || items.hammer || (items.net && (items.somaria || items.byrna || items.firerod || items.bow > 1))) && (items.sword || (flags.swordmode === 'S' && (items.hammer || items.net))) && (activeFlute() || items.glove) && (items.smallkeyhalf1 === 2 || flags.gametype == 'R') ? items.lantern ? 'available' : 'darkavailable' : 'unavailable';
					} else {
						return (items.sword || items.hammer || (items.net && (items.somaria || items.byrna || items.firerod || items.bow > 1))) && (items.sword || (flags.swordmode === 'S' && (items.hammer || items.net))) && (activeFlute() || items.glove) ? items.lantern ? 'available' : 'darkavailable' : 'unavailable';					
					}
				}
			};

			//define overworld chests
			window.chests = [{ // [0]
				caption: 'King\'s Tomb {boots} + {glove2}',
				is_opened: false,
				is_available: function() {
					return items.boots && items.glove === 2 && canReachLightWorld() ? 'available' : 'unavailable';
				}
			}, { // [1]
				caption: 'Light World Swamp (2)',
				is_opened: false,
				is_available: function() {
					return canReachLightWorldBunny() ? (items.moonpearl ? 'available' : 'unavailable') : 'unavailable';
				}
			}, { // [2]
				caption: 'Stoops Lonk\'s Hoose',
				is_opened: false,
				is_available: always
			}, { // [3]
				caption: 'Spiral Cave',
				is_opened: false,
				is_available: function() {
					return (activeFlute() || items.glove) && ((items.hookshot && items.moonpearl) || items.glove === 2) ?
						(items.moonpearl ? (items.lantern || activeFlute() ? 'available' : 'darkavailable') : 'unavailable') :
						'unavailable';
				}
			}, { // [4]
				caption: 'Mimic Cave',
				is_opened: false,
				is_available: function() {
					return items.hammer && items.moonpearl && (activeFlute() || items.glove) && (items.hookshot || items.glove === 2) ?
						(items.lantern || activeFlute() ? 'available' : 'darkavailable') :
						'unavailable';
				}
			}, { // [5]
				caption: 'Tavern',
				is_opened: false,
				is_available: function() {
					return canReachLightWorldBunny() ? (items.moonpearl ? 'available' : 'unavailable') : 'unavailable';
				}
			}, { // [6]
				caption: 'Chicken House {bomb}',
				is_opened: false,
				is_available: function() {
					return canReachLightWorld() && items.bomb ? 'available' : 'unavailable';
				}
			}, { // [7]
				caption: 'Bombable Hut {bomb}',
				is_opened: false,
				is_available: function() {
					return items.bomb ? 'available' : 'unavailable';
				}
			}, { // [8]
				caption: 'C House',
				is_opened: false,
				is_available: always
			}, { // [9]
				caption: 'Aginah\'s Cave {bomb}',
				is_opened: false,
				is_available: function() {
					return canReachLightWorld() && items.bomb ? 'available' : 'unavailable';
				}
			}, { // [10]
				caption: 'Mire Shed (2)',
				is_opened: false,
				is_available: function() {
					return activeFlute() || (items.mirror && canReachLightWorldBunny()) ? 'available' : 'unavailable';
				}
			}, { // [11]
				caption: 'Super Bunny Chests (2)',
				is_opened: false,
				is_available: function() {
					return (activeFlute() || items.glove) ?
						(items.lantern || activeFlute() ? 'available' : 'darkavailable') :
						'unavailable';
				}
			}, { // [12]
				caption: 'Sahasrahla\'s Hut (3) {bomb}/{boots}',
				is_opened: false,
				is_available: function() {
					return canReachLightWorldBunny() ? (items.moonpearl && (items.bomb || items.boots) ? 'available' : 'unavailable') : 'unavailable';
				}
			}, { // [13]
				caption: 'Byrna Spike Cave',
				is_opened: false,
				is_available: function() {
					return items.glove && items.hammer && (items.byrna || (items.cape && (items.bottle || items.magic))) ?
						items.lantern || activeFlute() ? 'available' : 'darkavailable' :
						'unavailable';
				}
			}, { // [14]
				caption: 'Kakariko Well (4 + {bomb})',
				is_opened: false,
				is_available: function() {
					return canReachLightWorldBunny() ? (items.moonpearl ? (items.bomb ? 'available' : 'partialavailable') : 'possible') : 'unavailable';
				}
			}, { // [15]
				caption: 'Thieve\'s Hut (4 + {bomb})',
				is_opened: false,
				is_available: function() {
					return canReachLightWorldBunny() ? (items.moonpearl ? (items.bomb ? 'available' : 'partialavailable') : (items.mirror ? 'possible' : 'unavailable')) : 'unavailable';
				}
			}, { // [16]
				caption: 'Hype Cave! {bomb} (NPC + 4 {bomb})',
				is_opened: false,
				is_available: function() {
					return items.bomb ? 'available' : 'unavailable';
				}
			}, { // [17]
				caption: 'Paradox Cave (5 + 2 {bomb})',
				is_opened: false,
				is_available: function() {
					return (activeFlute() || items.glove) && ((items.hookshot && items.moonpearl) || items.glove === 2) ?
						(items.moonpearl && (items.bomb || items.bow || items.boomerang || items.firerod || items.icerod || items.somaria) ?
						(items.lantern || activeFlute() ? (items.bomb ? 'available' : 'partialavailable') : 'darkavailable') :
						(items.sword >= 2 ? 'possible' : 'unavailable')) : 'unavailable';
				}
			}, { // [18]
				caption: 'West of Sanctuary {boots}',
				is_opened: false,
				is_available: function() {
					return items.boots && canReachLightWorld() ? 'available' : 'unavailable';
				}
			}, { // [19]
				caption: 'Minimoldorm Cave (NPC + 4) {bomb}',
				is_opened: false,
				is_available: function() {
					return canReachLightWorld() && items.bomb ? 'available' : 'unavailable';
				}
			}, { // [20]
				caption: 'Ice Rod Cave {bomb}',
				is_opened: false,
				is_available: function() {
					return canReachLightWorld() && items.bomb ? 'available' : 'unavailable';
				}
			}, { // [21]
				caption: 'Hookshot Cave (bottom chest) {hookshot}/{boots}',
				is_opened: false,
				is_available: function() {
					if (items.glove === 0 && !activeFlute()) return 'unavailable';
					return (items.boots || items.hookshot) && (items.glove || (items.mirror && (items.moonpearl || items.glove === 2))) ?
						(items.lantern || activeFlute() ? 'available' : 'darkavailable') :
						'unavailable';
				}
			}, { // [22]
				caption: 'Hookshot Cave (3 top chests) {hookshot}',
				is_opened: false,
				is_available: function() {
					if (items.glove === 0 && !activeFlute()) return 'unavailable';
					return items.hookshot && (items.glove || (items.mirror && (items.moonpearl || items.glove === 2))) ?
						(items.lantern || activeFlute() ? 'available' : 'darkavailable') :
						'unavailable';
				}
			}, { // [23]
				caption: 'Lost Woods Hideout Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && canReachLightWorld() ? 'bonkable' : 'unbonkable';
				}
			}, { // [24]
				caption: 'Death Mountain Bonk Rocks',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && (activeFlute() || items.glove) && items.moonpearl && (items.hookshot || items.glove === 2) ?
					(items.lantern || activeFlute() ? 'bonkable' : 'darkbonkable') : 'unbonkable';
				}
			}, { // [25]
				caption: 'Mountain Entry Pull Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && canReachLightWorld() ? 'bonkable' : 'unbonkable';
				}
			}, { // [26]
				caption: 'Mountain Entry Southeast Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && canReachLightWorld() ? 'bonkable' : 'unbonkable';
				}
			}, { // [27]
				caption: 'Lost Woods Pass West Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && canReachLightWorld() ? 'bonkable' : 'unbonkable';
				}
			}, { // [28]
				caption: 'Kakariko Portal Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && canReachLightWorld() ? 'bonkable' : 'unbonkable';
				}
			}, { // [29]
				caption: 'Fortune Bonk Rocks',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && canReachLightWorld() ? 'bonkable' : 'unbonkable';
				}
			}, { // [30]
				caption: 'Kakariko Pond Tree',
				is_opened: false,
				is_available: function() {
					return items.agahnim && canGetBonkableItem() && items.moonpearl ? 'bonkable' : 'unbonkable';
				}
			}, { // [31]
				caption: 'Bonk Rocks Tree',
				is_opened: false,
				is_available: function() {
					return items.agahnim && canGetBonkableItem() && items.moonpearl ? 'bonkable' : 'unbonkable';
				}
			}, { // [32]
				caption: 'Sanctuary Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && canReachLightWorld() ? 'bonkable' : 'unbonkable';
				}
			}, { // [33]
				caption: 'River Bend West Tree',
				is_opened: false,
				is_available: function() {
					return items.agahnim && canGetBonkableItem() && items.moonpearl ? 'bonkable' : 'unbonkable';
				}
			}, { // [34]
				caption: 'River Bend East Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && canReachLightWorld() ? 'bonkable' : 'unbonkable';
				}
			}, { // [35]
				caption: 'Blinds Hideout Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && canReachLightWorld() ? 'bonkable' : 'unbonkable';
				}
			}, { // [36]
				caption: 'Kakariko Welcome Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && canReachLightWorld() ? 'bonkable' : 'unbonkable';
				}
			}, { // [37]
				caption: 'Forgotten Forest Southwest Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && canReachLightWorld() ? 'bonkable' : 'unbonkable';
				}
			}, { // [38]
				caption: 'Forgotten Forest Central Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && canReachLightWorld() ? 'bonkable' : 'unbonkable';
				}
			}, { // [39]
				caption: 'Hyrule Castle Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && canReachLightWorld() ? 'bonkable' : 'unbonkable';
				}
			}, { // [40]
				caption: 'Wooden Bridge Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && canReachLightWorld() ? 'bonkable' : 'unbonkable';
				}
			}, { // [41]
				caption: 'Eastern Palace Tree',
				is_opened: false,
				is_available: function() {
					return items.agahnim && canGetBonkableItem() && items.moonpearl ? 'bonkable' : 'unbonkable';
				}
			}, { // [42]
				caption: 'Flute Boy South Tree',
				is_opened: false,
				is_available: function() {
					return items.agahnim && canGetBonkableItem() && items.moonpearl ? 'bonkable' : 'unbonkable';
				}
			}, { // [43]
				caption: 'Flute Boy East Tree',
				is_opened: false,
				is_available: function() {
					return items.agahnim && canGetBonkableItem() && items.moonpearl ? 'bonkable' : 'unbonkable';
				}
			}, { // [44]
				caption: 'Central Bonk Rocks Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && canReachLightWorld()? 'bonkable' : 'unbonkable';
				}
			}, { // [45]
				caption: 'Tree Line Tree 2',
				is_opened: false,
				is_available: function() {
					return items.agahnim && canGetBonkableItem() && items.moonpearl ? 'bonkable' : 'unbonkable';
				}
			}, { // [46]
				caption: 'Tree Line Tree 4',
				is_opened: false,
				is_available: function() {
					return items.agahnim && canGetBonkableItem() && items.moonpearl ? 'bonkable' : 'unbonkable';
				}
			}, { // [47]
				caption: 'Flute Boy Approach South Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && canReachLightWorld() ? 'bonkable' : 'unbonkable';
				}
			}, { // [48]
				caption: 'Flute Boy Approach North Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && canReachLightWorld() ? 'bonkable' : 'unbonkable';
				}
			}, { // [49]
				caption: 'Dark Lumberjack Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [50]
				caption: 'Dark Fortune Bonk Rocks (2)',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [51]
				caption: 'Dark Graveyard West Bonk Rock',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [52]
				caption: 'Dark Graveyard North Bonk Rocks',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [53]
				caption: 'Dark Graveyard Tomb Bonk Rocks',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [54]
				caption: 'Qirn Jump West Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [55]
				caption: 'Qirn Jump East Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && (activeFlute() || items.hammer || items.flippers || (items.agahnim && items.mirror && (items.moonpearl || items.glove))) ? 'bonkable' : 'unbonkable';
				}
			}, { // [56]
				caption: 'Dark Witch Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && (activeFlute() || items.hammer || items.flippers || (items.agahnim && items.mirror && (items.moonpearl || items.glove))) ? 'bonkable' : 'unbonkable';
				}
			}, { // [57]
				caption: 'Pyramid Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && (activeFlute() || items.hammer || items.flippers || (items.agahnim && items.mirror)) ? 'bonkable' : 'unbonkable';
				}
			}, { // [58]
				caption: 'Palace of Darkness Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && (activeFlute() || items.hammer || items.flippers || (items.agahnim && items.mirror)) ? 'bonkable' : 'unbonkable';
				}
			}, { // [59]
				caption: 'Dark Tree Line Tree 2',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && (activeFlute() || items.hammer || items.flippers || (items.agahnim && items.mirror)) ? 'bonkable' : 'unbonkable';
				}
			}, { // [60]
				caption: 'Dark Tree Line Tree 3',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && (activeFlute() || items.hammer || items.flippers || (items.agahnim && items.mirror)) ? 'bonkable' : 'unbonkable';
				}
			}, { // [61]
				caption: 'Dark Tree Line Tree 4',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && (activeFlute() || items.hammer || items.flippers || (items.agahnim && items.mirror)) ? 'bonkable' : 'unbonkable';
				}
			}, { // [62]
				caption: 'Hype Cave Statue',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [63]
				caption: 'Cold Fairy Statue',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && canReachLightWorld() && items.bomb? 'bonkable' : 'unbonkable';
				}

			}, { // [64]
				caption: 'Treasure Chest Minigame: Pay 30 rupees',
				is_opened: false,
				is_available: always
			}, { // [65]
				caption: 'Bottle Vendor: Pay 100 rupees',
				is_opened: false,
				is_available: function() {
					return canReachLightWorldBunny() ? 'available' : 'unavailable';
				}
			}, { // [66]
				caption: 'Sahasrahla {pendant0}',
				is_opened: false,
				is_available: function() {
					if(canReachLightWorldBunny())
						for(var k = 0; k < 10; k++)
							if(prizes[k] === 1 && items['boss'+k])
								return 'available';
					return 'unavailable';
				}
			}, { // [67]
				caption: 'Ol\' Stumpy',
				is_opened: false,
				is_available: always
			}, { // [68]
				caption: 'Lazy Drunk Kid: Distract him with {bottle} because he can\'t lay off the sauce!',
				is_opened: false,
				is_available: function() {
					return canReachLightWorldBunny() && items.bottle ? 'available' : 'unavailable';
				}
			}, { // [69]
				caption: 'Gary\'s Lunchbox (save the frog first)',
				is_opened: false,
				is_available: function() {
					return (items.mirror || (items.glove === 2 && activeFlute()) || (items.glove === 2 && (items.moonpearl || items.agahnim))) && canReachLightWorldBunny() ? 'available' : 'unavailable';
				}
			}, { // [70]
				caption: 'Fugitive under the bridge {flippers}',
				is_opened: false,
				is_available: function() {
					return canReachLightWorld() ? (items.flippers ? 'available' : 'unavailable') : 'unavailable';
				}
			}, { // [71]
				caption: 'Ether Tablet {sword2}{book}',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && items.hammer && items.book && (activeFlute() || items.glove) && (items.hookshot || items.glove === 2) ?
						(items.sword >= 2 || (flags.swordmode === 'S' && items.hammer) ? (items.lantern || activeFlute() ? 'available' : 'darkavailable') : 'information') :
						'unavailable';
				}
			}, { // [72]
				caption: 'Bombos Tablet {sword2}{book}',
				is_opened: false,
				is_available: function() {
					return canReachLightWorldBunny() && items.book ?
						(items.sword >= 2 || (flags.swordmode === 'S' && items.hammer)) ? 'available' : 'information' :
						'unavailable';
				}
			}, { // [73]
				caption: 'Catfish',
				is_opened: false,
				is_available: function() {
					if(canReachPyramid() && items.glove)
						return 'available';
					if(canReachLightWorld() && items.mirror)
						return 'available';
					return 'unavailable';
				}
			}, { // [74]
				caption: 'King Zora: Pay 500 rupees',
				is_opened: false,
				is_available: function() {
					return canReachLightWorld() ? (items.flippers || items.glove ? 'available' : 'unavailable') : 'unavailable';
				}
			}, { // [75]
				caption: 'Lost Old Man {lantern}',
				is_opened: false,
				is_available: function() {
					return items.glove || activeFlute() ? items.lantern ? 'available' : 'darkavailable' : 'unavailable';
				}
			}, { // [76]
				caption: 'Witch: Give her {mushroom}',
				is_opened: false,
				is_available: function() {
					return canReachLightWorld() && items.mushroom ? 'available' : 'unavailable';
				}
			}, { // [77]
				caption: 'Forest Hideout',
				is_opened: false,
				is_available: function() {
					return canReachLightWorldBunny() ? (items.moonpearl ? 'available' : 'possible') : 'unavailable';
				}
			}, { // [78]
				caption: 'Lumberjack Tree {agahnim}{boots}',
				is_opened: false,
				is_available: function() {
					return canReachLightWorldBunny() ? (items.agahnim && items.boots && items.moonpearl ? 'available' : 'information') : 'unavailable';
				}
			}, { // [79]
				caption: 'Spectacle Rock Cave',
				is_opened: false,
				is_available: function() {
					return items.glove || activeFlute() ? (items.lantern || activeFlute() ? 'available' : 'darkavailable') : 'unavailable';
				}
			}, { // [80]
				caption: 'South of Grove',
				is_opened: false,
				is_available: function() {
					return canReachLightWorldBunny() ? (items.moonpearl ? 'available' : 'information') : 'unavailable';
				}
			}, { // [81]
				caption: 'Graveyard Cliff Cave {bomb}',
				is_opened: false,
				is_available: function() {
					return canReachLightWorld() && items.bomb ? 'available' : 'unavailable';
				}
			}, { // [82]
				caption: 'Checkerboard Cave',
				is_opened: false,
				is_available: function() {
					return canReachLightWorld() && items.glove ? 'available' : 'unavailable';
				}
			}, { // [83]
				caption: '{hammer}{hammer}{hammer}{hammer}{hammer}{hammer}{hammer}{hammer}!!!!!!!!',
				is_opened: false,
				is_available: function() {
					return items.hammer && (items.glove === 2 || (items.mirror && canReachLightWorldBunny())) ? 'available' : 'unavailable';
				}
			}, { // [84]
				caption: 'Library {boots}',
				is_opened: false,
				is_available: function() {
					return canReachLightWorldBunny() ? (items.boots ? (items.moonpearl ? 'available' : 'information') : 'information') : 'unavailable';
				}
			}, { // [85]
				caption: 'Mushroom',
				is_opened: false,
				is_available: function() {
					return canReachLightWorldBunny() ? (items.moonpearl ? 'available' : 'possible') : 'unavailable';
				}
			}, { // [86]
				caption: 'Spectacle Rock',
				is_opened: false,
				is_available: function() {
					if(!(items.glove || activeFlute()))
						return 'unavailable';
					return items.moonpearl && items.hammer && (items.hookshot || items.glove === 2) ?
						(items.lantern || activeFlute() ? 'available' : 'darkavailable') :
						'information';
				}
			}, { // [87]
				caption: 'Floating Island',
				is_opened: false,
				is_available: function() {
					return (activeFlute() || items.glove) && ((items.hookshot && items.moonpearl) || items.glove === 2) ?
						(items.lantern || activeFlute() ? 'available' : 'darkavailable') :
						'unavailable';
				}
			}, { // [88]
				caption: 'Race Minigame {bomb}/{boots}',
				is_opened: false,
				is_available: function() {
					return canReachLightWorldBunny() && (items.bomb || items.boots) ? (items.moonpearl ? 'available' : 'possible') : 'unavailable';
				}
			}, { // [89]
				caption: 'Desert West Ledge {book}',
				is_opened: false,
				is_available: function() {
					//return canReachLightWorldBunny() ? (items.book ? (items.moonpearl ? 'available' : 'information') : 'information') : 'unavailable';
					if(!canReachLightWorldBunny())
						return 'unavailable';
					if(!items.book || (!items.moonpearl && flags.doorshuffle === 'N'))
						return 'information';
					var doorcheck = window.doorCheck(1,false,false,false,['glove',(!flags.wildkeys && flags.gametype != 'R') || !flags.wildbigkeys ? 'boots' : '','firesource','killbomb'],'connector');
					if(doorcheck)
						return doorcheck === 'available' && !items.moonpearl ? 'possible' : doorcheck;
					return 'available';
				}
			}, { // [90]
				caption: 'Lake Hylia Island {flippers}',
				is_opened: false,
				is_available: function() {
					if(!canReachLightWorldBunny())
						return 'unavailable';
					return items.moonpearl ? (items.flippers ? 'available' : 'information') : 'information';
				}
			}, { // [91]
				caption: 'Bumper Cave {cape}{mirror}',
				is_opened: false,
				is_available: function() {
					return items.glove && items.cape && items.mirror && canReachLightWorld() ? 'available' : 'information';
				}
			}, { // [92]
				caption: 'Pyramid',
				is_opened: false,
				is_available: function() {
					if(canReachPyramid())
						return 'available';
					return 'unavailable';
				}
			}, { // [93]
				caption: 'Alec Baldwin\'s Dig-a-Thon: Pay 80 rupees',
				is_opened: false,
				is_available: always
			}, { // [94]
				caption: 'Zora River Ledge {flippers}',
				is_opened: false,
				is_available: function() {
					if(!canReachLightWorld())
						return 'unavailable';
					if(items.flippers)
						return 'available';
					return 'information';
				}
			}, { // [95]
				caption: 'Buried Item {shovel}',
				is_opened: false,
				is_available: function() {
					return items.shovel && canReachLightWorld() ? 'available' : 'unavailable';
				}
			}, { // [96]
				caption: 'Escape Sewer Side Room (3) {bomb}/{boots} (may need small key)',
				is_opened: false,
				is_available: function() {
					if(!canReachLightWorldBunny() || !items.moonpearl)
						return 'unavailable';
					var doorcheck = window.doorCheck(11,false,false,true,['glove','killbomb','bombdash'],'item');
					if(doorcheck)
						return items.moonpearl ? doorcheck : 'unavailable';
					if (!items.bomb && !items.boots) return 'unavailable';
					if (flags.wildkeys) {
						if (items.glove) return 'available';
						if (items.bomb || melee_bow() || items.firerod || cane()) {
							if (items.smallkeyhalf0 === 1) return canDoTorchDarkRooms() ? 'available' : 'darkavailable';
						}
						return 'unavailable';
					}
					return items.glove ? 'available' : (items.bomb || melee_bow() || rod() || cane() ? (canDoTorchDarkRooms() ? 'possible' : 'darkpossible') : 'unavailable');
				}
			}, { // [97]
				caption: "Castle Secret Entrance (Uncle + 1)",
				is_opened: false,
				is_available: function() {
					return canReachLightWorld() ? 'available' : 'unavailable';
				}
			}, { // [98]
				caption: 'Hyrule Castle Dungeon (3)',
				is_opened: false,
				is_available: function() {
					if(!canReachLightWorldBunny())
						return 'unavailable';
					var doorcheck = window.doorCheck(11,false,false,true,['glove','killbomb','bombdash'],'item');
					if(doorcheck)
						return items.moonpearl ? doorcheck : 'unavailable';
					return canReachLightWorldBunny() ? (items.moonpearl ? 'available' : 'unavailable') : 'unavailable';
				}
			}, { // [99]
				caption: 'Sanctuary',
				is_opened: false,
				is_available: function() {
					return canReachLightWorldBunny() ? (items.moonpearl ? 'available' : 'unavailable') : 'unavailable';
				}
			}, { // [100]
				caption: 'Mad Batter {hammer} + {powder}',
				is_opened: false,
				is_available: function() {
					return items.powder && items.hammer && canReachLightWorld() ? 'available' : 'unavailable';
				}
			}, { // [101]
				caption: 'Take the frog home',
				is_opened: false,
				is_available: function() {
					return (items.mirror || (items.glove === 2 && activeFlute()) || (items.glove === 2 && (items.moonpearl || items.agahnim))) && canReachLightWorldBunny() ? 'available' : 'unavailable';
				}
			}, { // [102]
				caption: 'Fat Fairy: Buy OJ bomb from Light Link\'s House after {crystal}5 {crystal}6 (2 items)',
				is_opened: false,
				is_available: function() {
					//crystal check
					var crystal_count = 0;
					for(var k = 0; k < 10; k++)
						if(prizes[k] === 4 && items['boss'+k])
							crystal_count += 1;
					return crystal_count >= 2 && items.mirror && canReachLightWorldBunny() ? 'available' : 'unavailable';
				}
			}, { // [103]
				caption: 'Master Sword Pedestal {pendant0}{pendant1}{pendant2} (can check with {book})',
				is_opened: false,
				is_available: function() {
					if(!canReachLightWorldBunny())
						return 'unavailable';
					var pendant_count = 0;
					for(var k = 0; k < 10; k++)
						if((prizes[k] === 1 || prizes[k] === 2) && items['boss'+k])
							if(++pendant_count === 3)
								return 'available';
					return items.book ? 'information' : 'unavailable';
				}
			}, { // [104]
				caption: 'Escape Sewer Dark Room {lantern}',
				is_opened: false,
				is_available: function() {
					if(!canReachLightWorldBunny())
						return 'unavailable';
					var doorcheck = window.doorCheck(11,false,false,true,['glove','killbomb','bombdash'],'item');
					if(doorcheck)
						return items.moonpearl ? doorcheck : 'unavailable';
					return canReachLightWorldBunny() && items.moonpearl ? (canDoTorchDarkRooms() ? 'available' : 'darkavailable') : 'unavailable';
				}
			}, { // [105]
				caption: 'Waterfall of Wishing (2) {flippers}',
				is_opened: false,
				is_available: function() {
					return canReachLightWorld() ? (items.flippers ? 'available' : 'unavailable') : 'unavailable';
				}
			}, { // [106]
				caption: 'Castle Tower',
				is_opened: false,
				is_available: function() {
					if(!items.glove && !activeFlute())
						return 'unavailable';
					//var doorcheck = window.doorCheck(12,!items.lantern && !activeFlute(),true,true,['swordorswordless'],'item');
					//if(doorcheck)
					//	return doorcheck;
					if(flags.doorshuffle === 'B')
						return window.doorCheck(12,!items.lantern && !activeFlute(),true,true,['kill','swordorswordless'],'item');
						//return (items.sword || (flags.swordmode === 'S' && (items.hammer || items.net)/* && agatowerweapon()*/)) && (items.smallkeyhalf1 === 2 || flags.gametype === 'R') ? (items.lantern ? 'available' : 'darkavailable') : 'unavailable';
					if(flags.doorshuffle === 'C')
						return window.doorCheck(12,!items.lantern && !activeFlute(),true,true,['kill'],'item');
					if(!items.bomb && !melee_bow() && !cane() && !items.firerod)
						return 'unavailable';
					return (activeFlute() || items.glove) ? (items.lantern || activeFlute()) ? 'available' : 'darkavailable' : 'unavailable';
				}
			}, { // [107]
				caption: 'Castle Tower (small key)',
				is_opened: false,
				is_available: function() {
					if(!items.glove && !activeFlute())
						return 'unavailable';
					if(flags.doorshuffle === 'B')
						return window.doorCheck(12,!items.lantern && !activeFlute(),true,true,['kill','swordorswordless'],'item');
						//return (items.sword || (flags.swordmode === 'S' && (items.hammer || items.net)/* && agatowerweapon()*/)) && (items.smallkeyhalf1 === 2 || flags.gametype === 'R') ? (items.lantern ? 'available' : 'darkavailable') : 'unavailable';
					if(flags.doorshuffle === 'C')
						return window.doorCheck(12,!items.lantern && !activeFlute(),true,true,['kill'],'item');
					if(!items.bomb && !melee_bow() && !cane() && !items.firerod)
						return 'unavailable';
					if (flags.gametype === 'R') {
						return (activeFlute() || items.glove) ? items.lantern ? 'available' : 'darkavailable' : 'unavailable';
					} else {
						return (activeFlute() || items.glove) && (items.smallkeyhalf1 > 0 || flags.gametype == 'R') ? items.lantern ? 'available' : 'darkavailable' : 'unavailable';
					}
				}
			}, { // [108]
				caption: 'Lake Hylia Shop (3)',
				is_opened: false,
				is_available: function() {
					return canReachLightWorldBunny() ? 'available' : 'unavailable';
				}
			}, { // [109]
				caption: 'Kakariko Shop (3)',
				is_opened: false,
				is_available: function() {
					return canReachLightWorldBunny() ? 'available' : 'unavailable';
				}
			}, { // [110]
				caption: 'Paradox Shop (3) {bomb}',
				is_opened: false,
				is_available: function() {
					return (activeFlute() || items.glove) && ((items.hookshot && items.moonpearl) || items.glove === 2) ?
						(items.moonpearl && items.bomb ? (items.lantern || activeFlute() ? 'available' : 'darkavailable') : 'unavailable') :
						'unavailable';
				}
			}, { // [111]
				caption: 'Dark Lake Hylia Shop (3)',
				is_opened: false,
				is_available: always
			}, { // [112]
				caption: 'Village of Outcasts Shop (3) {hammer}',
				is_opened: false,
				is_available: function() {
					return items.hammer || (items.mirror && canReachLightWorldBunny()) ? (items.hammer || items.moonpearl ? 'available' : 'possible') : 'unavailable';
				}
			}, { // [113]
				caption: 'Dark Death Mountain Shop (3)',
				is_opened: false,
				is_available: function() {
					return (activeFlute() || items.glove) ?
						(items.lantern || activeFlute() ? 'available' : 'darkavailable') :
						'unavailable';
				}
			}, { // [114]
				caption: 'Dark Potion Shop (3)',
				is_opened: false,
				is_available: function() {
					if(items.hammer || items.flippers)
						return 'available';
					return items.mirror && canReachLightWorldBunny() ? (items.moonpearl ? 'available' : 'possible') : 'unavailable';
				}
			}, { // [115]
				caption: 'Dark Lumberjack Shop (3)',
				is_opened: false,
				is_available: always
			}, { // [116]
				caption: 'Curiosity Shop (3)',
				is_opened: false,
				is_available: always
			}, { // [117]
				caption: 'Potion Shop (3)',
				is_opened: false,
				is_available: function() {
					return canReachLightWorldBunny() ? (items.moonpearl ? 'available' : 'possible') : 'unavailable';
				}
			}, { // [118]
				caption: 'Pond of Happiness (2)',
				is_opened: false,
				is_available: function() {
					return items.flippers && (canReachLightWorld() || items.glove === 2) ? 'available' : 'unavailable';
				}
			}, { // [119]
				caption: 'Bomb Shop (2)',
				is_opened: false,
				is_available: function() {
					return canReachLightWorldBunny() ? 'available' : 'unavailable';
				}

			}];
		}
		else
		{
			// define dungeon chests
			window.dungeons = [{ // [0]
				caption: 'Eastern Palace',
				is_beaten: false,
				is_beatable: function() {
					var doorcheck = window.doorCheck(0,false,true,true,['hookshot','bow'],'boss');
					if(doorcheck)
						return doorcheck;
					return window.EPBoss();
				},
				can_get_chest: function() {
					var doorcheck = window.doorCheck(0,false,true,true,['hookshot','bow'],'item');
					if(doorcheck)
						return doorcheck;
					return window.EPChests();
					
				}
			}, { // [1]
				caption: 'Desert Palace {book} / {glove2} {mirror} {flute}',
				is_beaten: false,
				is_beatable: function() {
					if (!items.book && !(items.flute && items.glove === 2 && items.mirror)) return 'unavailable';
					var doorcheck = window.doorCheck(1,false,false,false,[(!flags.wildkeys && flags.gametype != 'R') || !flags.wildbigkeys ? 'boots' : '','glove','firesource','killbomb','mirrordesert'],'boss');
					if(doorcheck)
						return doorcheck;
					return window.DPBoss();
				},
				can_get_chest: function() {
					if (!items.book && !(items.flute && items.glove === 2 && items.mirror)) return 'unavailable';
					var doorcheck = window.doorCheck(1,false,false,false,['boots','glove','firesource','killbomb','mirrordesert'],'item');
					if(doorcheck)
						return doorcheck;
					return window.DPChests();
				}
			}, { // [2]
				caption: 'Tower of Hera {mirror} / {hookshot} {hammer}',
				is_beaten: false,
				is_beatable: function() {
					if (!items.flute && !items.glove) return 'unavailable';
					if (!items.mirror && !(items.hookshot && items.hammer)) return 'unavailable';
					if (!items.flute && !items.glove) return 'unavailable';
					var doorcheck = window.doorCheck(2,!items.flute && !items.lantern,false,false,[(!flags.wildkeys && flags.gametype != 'R') || !flags.wildbigkeys ? 'firesource' : '','kill'],'boss');
					if(doorcheck)
					{
					//	if(!items.flute && !items.lantern && (doorcheck === 'available' || doorcheck === 'possible'))
					//		return 'dark'+doorcheck;
						return doorcheck;
					}
					if (!canHitSwitch()) return 'unavailable';
					return window.HeraBoss();
				},
				can_get_chest: function() {
					if (!items.flute && !items.glove) return 'unavailable';
					if (!items.mirror && !(items.hookshot && items.hammer)) return 'unavailable';
					var doorcheck = window.doorCheck(2,!items.flute && !items.lantern,false,false,['firesource','kill'],'item');
					if(doorcheck)
					{
					//	if(!items.flute && !items.lantern && (doorcheck === 'available' || doorcheck === 'possible'))
					//		return 'dark'+doorcheck;
						return doorcheck;
					}
					if (!canHitSwitch()) return 'unavailable';
					return window.HeraChests();
				}
			}, { // [3]
				caption: 'Palace of Darkness',
				is_beaten: false,
				is_beatable: function() {
					if (!canReachDarkWorld()) return 'unavailable';
					if (!items.agahnim && !(items.hammer && items.glove) && !(items.glove === 2 && items.flippers)) return 'unavailable';
					var doorcheck = window.doorCheck(3,false,true,true,['boots','hammer','bow','bomb'],'boss');
					if(doorcheck)
						return doorcheck;
					return window.PoDBoss();
				},
				can_get_chest: function() {
					if (!canReachDarkWorld()) return 'unavailable';
					if (!items.agahnim && !(items.hammer && items.glove) && !(items.glove === 2 && items.flippers)) return 'unavailable';
					var doorcheck = window.doorCheck(3,false,true,true,['boots','hammer','bow','bomb'],'item');
					if(doorcheck)
						return doorcheck;
					return window.PoDChests();
				}
			}, { // [4]
				caption: 'Swamp Palace {mirror} {flippers}',
				is_beaten: false,
				is_beatable: function() {
					if (!canReachDarkWorld()) return 'unavailable';
					if (!items.glove && !items.agahnim) return 'unavailable';
					if (!can_reach_outcast() && (!items.agahnim || !items.moonpearl || !items.hammer)) return 'unavailable';
					var doorcheck = window.doorCheck(4,false,false,false,['flippers','mirror','hookshot','hammer','bomb'],'boss');
					if(doorcheck)
						return doorcheck;
					return window.SPBoss();
				},
				can_get_chest: function() {
					if (!canReachDarkWorld()) return 'unavailable';
					if (!items.glove && !items.agahnim) return 'unavailable';
					if (!can_reach_outcast() && (!items.agahnim || !items.moonpearl || !items.hammer)) return 'unavailable';
					var doorcheck = window.doorCheck(4,false,false,false,['flippers','mirror','hookshot','hammer','bomb'],'item');
					if(doorcheck)
						return doorcheck;
					return window.SPChests();
				}
			}, { // [5]
				caption: 'Skull Woods',
				is_beaten: false,
				is_beatable: function() {
					if (!can_reach_outcast() || !canReachDarkWorld()) return 'unavailable';
					var doorcheck = window.doorCheck(5,false,false,false,['firerod','swordorswordless','bomb'],'boss');
					if(doorcheck)
						return doorcheck;
					return window.SWBoss();
				},
				can_get_chest: function() {
					if (!can_reach_outcast() || !canReachDarkWorld()) return 'unavailable';
					var doorcheck = window.doorCheck(5,false,false,false,['firerod','swordorswordless','bomb'],'item');
					if(doorcheck)
						return doorcheck;
					return window.SWChests();
				}
			}, { // [6]
				caption: 'Thieves\' Town',
				is_beaten: false,
				is_beatable: function() {
					if (!can_reach_outcast() || !canReachDarkWorld()) return 'unavailable';
					var doorcheck = window.doorCheck(6,false,false,false,[(!flags.wildkeys && flags.gametype != 'R') || !flags.wildbigkeys ? 'hammer' : '','glove','bomb'],'boss');
					if(doorcheck)
						return doorcheck;
					return window.TTBoss();
				},
				can_get_chest: function() {
					if (!can_reach_outcast() || !canReachDarkWorld()) return 'unavailable';
					var doorcheck = window.doorCheck(6,false,false,false,['hammer','glove','bomb'],'item');
					if(doorcheck)
						return doorcheck;
					return window.TTChests();
				}
			}, { // [7]
				caption: 'Ice Palace {flippers} [{firerod}/{bombos}]',
				is_beaten: false,
				is_beatable: function() {
					if (!items.moonpearl || !items.flippers || items.glove !== 2 || !canReachDarkWorld()) return 'unavailable';
					var doorcheck = window.doorCheck(7,false,false,false,['freezor','hammer','glove','hookshot','somaria','bomb'],'boss');
					if(doorcheck)
						return doorcheck;
					return window.IPBoss();
				},
				can_get_chest: function() {
					if (!items.moonpearl || !items.flippers || items.glove !== 2 || !canReachDarkWorld()) return 'unavailable';
					var doorcheck = window.doorCheck(7,false,false,false,['freezor','hammer','glove','hookshot','somaria','bomb'],'item');
					if(doorcheck)
						return doorcheck;
					return window.IPChests();
				}
			}, { // [8]
				caption: 'Misery Mire {medallion0} [{boots}/{hookshot}]',
				is_beaten: false,
				is_beatable: function() {
					//if (!items.moonpearl || !items.flute || items.glove !== 2 || !items.somaria || !canReachDarkWorld()) return 'unavailable';
					//if (!items.boots && !items.hookshot) return 'unavailable';
					//if (!items.bigkey8 || medallionCheck(0) === 'unavailable') return 'unavailable';
					if (!items.moonpearl || !items.flute || items.glove !== 2 || !canReachDarkWorld() || medallionCheck(0) === 'unavailable') return 'unavailable';
					//var state = medallionCheck(0);
					//if (state) return state;
					var doorcheck = window.doorCheck(8,false,true,false,['hookshot','firesource','somaria','bomb'],'boss');
					if(doorcheck)
					{
						if(doorcheck === 'unavailable')
							return 'unavailable';
						if(medallionCheck(0) === 'possible' && doorcheck === 'available')
							return 'possible';
						if(medallionCheck(0) === 'possible' && doorcheck === 'darkavailable')
							return 'darkpossible';
						return doorcheck;
					}
					if (!items.bigkey8 || !items.somaria) return 'unavailable';
					return window.MMBoss(medallion_check(0));
				},
				can_get_chest: function() {
					if (!items.moonpearl || !items.flute || items.glove !== 2 || !canReachDarkWorld() || medallionCheck(0) === 'unavailable') return 'unavailable';
					//var state = medallionCheck(0);
					//if (state) return state;
					var doorcheck = window.doorCheck(8,false,true,false,['hookshot','firesource','somaria','bomb'],'item');
					if(doorcheck)
					{
						if(doorcheck === 'unavailable')
							return 'unavailable';
						if(medallionCheck(0) === 'possible' && doorcheck === 'available')
							return 'possible';
						if(medallionCheck(0) === 'possible' && doorcheck === 'darkavailable')
							return 'darkpossible';
						return doorcheck;
					}
					return window.MMChests(medallion_check(0));
				}
			}, { // [9]
				caption: 'Turtle Rock {medallion0} {hammer} {somaria}',
				is_beaten: false,
				is_beatable: function() {
					if (!items.moonpearl || !items.hammer || items.glove !== 2 || !canReachDarkWorld()) return 'unavailable';
					if (!items.hookshot && !items.mirror) return 'unavailable';
					if (medallionCheck(1) === 'unavailable') return 'unavailable';
					//var state = medallionCheck(1);
					//if (state) return state;
					var doorcheck = window.doorCheck(9,!items.flute && !items.lantern,true,false,['somaria','firerod',(!flags.wildkeys && flags.gametype != 'R') || !flags.wildbigkeys ? 'laserbridge' : '','bomb'],'boss');
					if(doorcheck)
					{
						if(doorcheck === 'unavailable')
							return 'unavailable';
						if(medallionCheck(1) === 'possible' && doorcheck === 'available')
							return 'possible';
						if(medallionCheck(1) === 'possible' && doorcheck === 'darkavailable')
							return 'darkpossible';
						return doorcheck;
					}
					if (!items.bigkey9) return 'unavailable';
					return window.TRFrontBoss(medallion_check(1));
				},
				can_get_chest: function() {
					if (!items.moonpearl || !items.hammer || items.glove !== 2 || !canReachDarkWorld()) return 'unavailable';
					if (!items.hookshot && !items.mirror) return 'unavailable';
					if (medallionCheck(1) === 'unavailable') return 'unavailable';
					//var state = medallionCheck(1);
					//if (state) return state;				
					var doorcheck = window.doorCheck(9,!items.flute && !items.lantern,true,false,['somaria','firerod','laserbridge','bomb'],'item');
					if(doorcheck)
					{
						if(doorcheck === 'unavailable')
							return 'unavailable';
						if(medallionCheck(1) === 'possible' && doorcheck === 'available')
							return 'possible';
						if(medallionCheck(1) === 'possible' && doorcheck === 'darkavailable')
							return 'darkpossible';
						return doorcheck;
					}
					return window.TRFrontChests(medallion_check(1));
				}
			}, { // [10]
				caption: 'Ganon\'s Castle (Crystals)',
				is_beaten: false,
				is_beatable: function() {
					if ((crystalCheck() < flags.ganonvulncount && flags.goals != 'A') || ((crystalCheck() < flags.opentowercount || !items.agahnim2) && flags.goals != 'F') || !canReachDarkWorld() || (flags.goals === 'A' && (!items.agahnim || !allDungeonCheck()))) return 'unavailable';
					if ((flags.swordmode != 'S' && items.sword < 2) || (flags.swordmode === 'S' && !items.hammer) || (!items.lantern && !items.firerod)) return 'unavailable';
					//Fast Ganon
					if (flags.goals === 'F' && (items.sword > 1 || (flags.swordmode === 'S' && items.hammer)) && (items.lantern || items.firerod)) return 'available';
					var doorcheck = window.doorCheck(10,!items.flute && !items.lantern,false,false,['hammer','firerod','hookshot','boomerang','somaria',(!flags.wildkeys && flags.gametype != 'R') || !flags.wildbigkeys ? 'boots' : '','bow',flags.bossshuffle === 'N' ? '' : 'icerod','bomb'],'boss');
					if(doorcheck)
						return doorcheck;
					return window.GTBoss();
				},
				can_get_chest: function() {
					if (items.glove < 2 || (!items.hookshot && (!items.mirror || !items.hammer)) || !canReachDarkWorld()) return 'unavailable';
					if (flags.opentowercount == 8) {
						return (items.lantern || items.flute) ? 'possible' : 'darkpossible';
					}
					if (crystalCheck() < 7 && crystalCheck() < flags.opentowercount) return 'unavailable';
					var doorcheck = window.doorCheck(10,!items.flute && !items.lantern,false,false,['hammer','firerod','hookshot','boomerang','somaria','boots','bow',flags.bossshuffle === 'N' ? '' : 'icerod','bomb'],'item');
					if(doorcheck)
						return doorcheck;
					return window.GTChests();
				}
			}, { // [11]
				caption: 'Hyrule Castle',//Only used with Entrance or Door Shuffle
				is_beaten: false,
				is_beatable: function() {
					return items.chest11 ?window.dungeons[11].can_get_chest() :'opened';
				},
				can_get_chest: function() {
					return window.doorCheck(11,false,false,flags.gametype != 'S',['glove','killbomb','bombdash'],'item');
				}
			}, { // [12]
				caption: 'Castle Tower',//Only used with Entrance or Door Shuffle
				is_beaten: false,
				is_beatable: function() {
					return window.agahnim.is_available();
				},
				can_get_chest: function() {
					if(items.sword < 2 && (flags.swordmode != 'S' || !items.hammer) && !items.cape && !items.agahnim)
						return 'unavailable';
					if(items.mirror && (items.agahnim || (items.glove && items.hammer && items.moonpearl) || (items.glove === 2 && items.moonpearl && items.flippers)))
						return window.doorCheck(12,false,true,true,['kill','swordorswordless'],'item');
					return 'possible';
				}
			}];

			window.agahnim = {
				caption: 'Agahnim {sword2}/ ({cape}{sword1}){lantern}',
				is_available: function() {
					if(items.sword < 2 && (flags.swordmode != 'S' || !items.hammer) && !items.cape && !items.agahnim)
						return 'unavailable';
					if(!items.sword && !items.hammer && !items.net)
						return 'unavailable';
					if(!items.bomb && !melee_bow() && !cane() && !items.firerod)
						return 'unavailable';
					if(flags.doorshuffle === 'B')
					{
						if(!melee_bow() && !cane() && !items.firerod)
							return 'unavailable';
						if(items.mirror && (items.agahnim || (items.glove && items.hammer && items.moonpearl) || (items.glove === 2 && items.moonpearl && items.flippers)))
							return (items.sword || (flags.swordmode === 'S' && (items.hammer || items.net)/* && agatowerweapon()*/)) && (items.smallkeyhalf1 === 2 || flags.gametype === 'R') ? (items.lantern ? 'available' : 'darkavailable') : 'unavailable';
						return (items.sword || (flags.swordmode === 'S' && (items.hammer || items.net)/* && agatowerweapon()*/)) && (items.smallkeyhalf1 === 2 || flags.gametype === 'R') ? (items.lantern ? 'possible' : 'darkpossible') : 'unavailable';
					}
					if(flags.doorshuffle === 'C')
					{
						if(items.mirror && (items.agahnim || (items.glove && items.hammer && items.moonpearl) || (items.glove === 2 && items.moonpearl && items.flippers)))
							return window.doorCheck(12,false,true,true,[],'boss');
						return 'possible';
					}
					//var doorcheck = window.doorCheck(11,false,false,flags.gametype != 'S',['glove'],'connector');
					//if(doorcheck)
					//{
					//	if(flags.doorshuffle === 'C')
					//		return doorcheck;
					//	return (items.sword || (flags.swordmode === 'S' && (items.hammer || items.net)/* && agatowerweapon()*/)) && (items.smallkeyhalf1 === 2 || flags.gametype === 'R') ? (items.lantern ? doorcheck : 'dark'+doorcheck) : 'unavailable';
					//}
					if (flags.wildkeys) {
						return (items.sword >= 2 || (items.cape && items.sword) || (flags.swordmode === 'S' && (items.hammer || (items.cape && items.net)))) && (items.smallkeyhalf1 === 2 || flags.gametype == 'R') && agatowerweapon() ? items.lantern ? 'available' : 'darkavailable' : 'unavailable';
					} else {
						return ((items.sword >= 2 || (items.cape && items.sword) || (flags.swordmode === 'S' && (items.hammer || (items.cape && items.net)))) && agatowerweapon()) ? items.lantern ? 'available' : 'darkavailable' : 'unavailable';
					}
				}
			};

			//define overworld chests
			window.chests = [{ // [0]
				caption: 'King\'s Tomb {boots} + {glove2}/{mirror}',
				is_opened: false,
				is_available: function() {
					if (!items.boots) return 'unavailable';
					if (can_reach_outcast() && items.mirror || items.glove === 2) return 'available';
					return 'unavailable';
				}
			}, { // [1]
				caption: 'Light World Swamp (2)',
				is_opened: false,
				is_available: always
			}, { // [2]
				caption: 'Stoops Lonk\'s Hoose',
				is_opened: (flags.gametype === 'S'),
				is_available: always
			}, { // [3]
				caption: 'Spiral Cave',
				is_opened: false,
				is_available: function() {
					return (items.glove || items.flute) && (items.hookshot || items.mirror && items.hammer) ?
						items.lantern || items.flute ? 'available' : 'darkavailable' :
						'unavailable';
				}
			}, { // [4]
				caption: 'Mimic Cave ({mirror} outside of Turtle Rock)(Yellow = {medallion0} unkown OR possible w/out {firerod})',
				is_opened: false,
				is_available: function() {
					if (!items.moonpearl || !items.hammer || items.glove !== 2 || (!items.somaria && flags.doorshuffle === 'N') || !items.mirror || (!items.bomb && flags.doorshuffle === 'N') || (flags.wildkeys && flags.doorshuffle === 'N' && items.smallkey9 <= 1 && flags.gametype != 'R')) return 'unavailable';
					var state = medallionCheck(1);	
					if (state) return state === 'possible' && !items.flute && !items.lantern ? 'darkpossible' : state;

					var doorcheck = window.doorCheck(9,!items.flute && !items.lantern,true,false,['somaria','firerod',(!flags.wildkeys && flags.gametype != 'R') || !flags.wildbigkeys ? 'laserbridge' : '','bomb'],'connector');
					if(doorcheck)
						return doorcheck;

					if (flags.wildkeys) {
						return (items.smallkey9 <= 1 && flags.gametype != 'R') ? 'unavailable' : (items.lantern || items.flute ? 'available' : 'darkavailable');
					}

					return items.firerod ? (items.lantern || items.flute ? 'available' : 'darkavailable') : (items.lantern || items.flute ? 'possible' : 'darkpossible');
				}
			}, { // [5]
				caption: 'Tavern',
				is_opened: false,
				is_available: always
			}, { // [6]
				caption: 'Chicken House {bomb}',
				is_opened: false,
				is_available: function() {
					return items.bomb ? 'available' : 'unavailable';
				}
			}, { // [7]
				caption: 'Bombable Hut {bomb}',
				is_opened: false,
				is_available: function() {
					return can_reach_outcast() && items.bomb ? 'available' : 'unavailable';
				}
			}, { // [8]
				caption: 'C House',
				is_opened: false,
				is_available: function() {
					return can_reach_outcast() ? 'available' : 'unavailable';
				}
			}, { // [9]
				caption: 'Aginah\'s Cave {bomb}',
				is_opened: false,
				is_available: function() {
					return items.bomb ? 'available' : 'unavailable';
				}
			}, { // [10]
				caption: 'Mire Shed (2)',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && items.flute && items.glove === 2 ? 'available' : 'unavailable';
				}
			}, { // [11]
				caption: 'Super Bunny Chests (2)',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && items.glove === 2 && (items.hookshot || items.mirror && items.hammer) ?
						items.lantern || items.flute ? 'available' : 'darkavailable' :
						'unavailable';
				}
			}, { // [12]
				caption: 'Sahasrahla\'s Hut (3) {bomb}/{boots}',
				is_opened: false,
				is_available: function() {
					return items.bomb || items.boots ? 'available' : 'unavailable';
				}
			}, { // [13]
				caption: 'Byrna Spike Cave',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && items.glove && items.hammer && (items.byrna || (items.cape && (items.bottle || items.magic))) ?
						items.lantern || items.flute ? 'available' : 'darkavailable' :
						'unavailable';
				}
			}, { // [14]
				caption: 'Kakariko Well (4 + {bomb})',
				is_opened: false,
				is_available: function() {
					return items.bomb ? 'available' : 'partialavailable';
				}
			}, { // [15]
				caption: 'Thieve\'s Hut (4 + {bomb})',
				is_opened: false,
				is_available: function() {
					return items.bomb ? 'available' : 'partialavailable';
				}
			}, { // [16]
				caption: 'Hype Cave! {bomb} (NPC + 4 {bomb})',
				is_opened: false,
				is_available: function() {
					return items.bomb && (can_reach_outcast() || (items.agahnim && items.moonpearl && items.hammer)) ? 'available' : 'unavailable';
				}
			}, { // [17]
				caption: 'Paradox Cave (5 + 2 {bomb})',
				is_opened: false,
				is_available: function() {
					return (items.glove || items.flute) && (items.hookshot || (items.mirror && items.hammer)) &&
					(items.bomb || items.bow || items.boomerang || items.firerod || items.icerod || items.somaria) ?
					(items.lantern || items.flute ? (items.bomb ? 'available' : 'partialavailable') : 'darkavailable') : 'unavailable';
				}
			}, { // [18]
				caption: 'West of Sanctuary {boots}',
				is_opened: false,
				is_available: function() {
					return items.boots ? 'available' : 'unavailable';
				}
			}, { // [19]
				caption: 'Minimoldorm Cave (NPC + 4) {bomb}',
				is_opened: false,
				is_available: function() {
					return items.bomb ? 'available' : 'unavailable';
				}
			}, { // [20]
				caption: 'Ice Rod Cave {bomb}',
				is_opened: false,
				is_available: function() {
					return items.bomb ? 'available' : 'unavailable';
				}
			}, { // [21]
				caption: 'Hookshot Cave (bottom chest) {hookshot}/{boots}',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && items.glove === 2 && (items.hookshot || (items.mirror && items.hammer && items.boots)) ?
						items.lantern || items.flute ? 'available' : 'darkavailable' :
						'unavailable';
				}
			}, { // [22]
				caption: 'Hookshot Cave (3 top chests) {hookshot}',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && items.glove === 2 && items.hookshot ?
						items.lantern || items.flute ? 'available' : 'darkavailable' :
						'unavailable';
				}
			}, { // [23]
				caption: 'Lost Woods Hideout Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [24]
				caption: 'Death Mountain Bonk Rocks',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && canReachEDM() ?
					(items.lantern || items.flute ? 'bonkable' : 'darkbonkable') : 'unbonkable';
				}
			}, { // [25]
				caption: 'Mountain Entry Pull Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [26]
				caption: 'Mountain Entry Southeast Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [27]
				caption: 'Lost Woods Pass West Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [28]
				caption: 'Kakariko Portal Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [29]
				caption: 'Fortune Bonk Rocks',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [30]
				caption: 'Kakariko Pond Tree',
				is_opened: false,
				is_available: function() {
					return items.agahnim && (canGetBonkableItem()) ? 'bonkable' : 'unbonkable';
				}
			}, { // [31]
				caption: 'Bonk Rocks Tree',
				is_opened: false,
				is_available: function() {
					return items.agahnim && (canGetBonkableItem()) ? 'bonkable' : 'unbonkable';
				}
			}, { // [32]
				caption: 'Sanctuary Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [33]
				caption: 'River Bend West Tree',
				is_opened: false,
				is_available: function() {
					return items.agahnim && (canGetBonkableItem()) ? 'bonkable' : 'unbonkable';
				}
			}, { // [34]
				caption: 'River Bend East Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [35]
				caption: 'Blinds Hideout Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [36]
				caption: 'Kakariko Welcome Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [37]
				caption: 'Forgotten Forest Southwest Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [38]
				caption: 'Forgotten Forest Central Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [39]
				caption: 'Hyrule Castle Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [40]
				caption: 'Wooden Bridge Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [41]
				caption: 'Eastern Palace Tree',
				is_opened: false,
				is_available: function() {
					return items.agahnim && canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [42]
				caption: 'Flute Boy South Tree',
				is_opened: false,
				is_available: function() {
					return items.agahnim && canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [43]
				caption: 'Flute Boy East Tree',
				is_opened: false,
				is_available: function() {
					return items.agahnim && canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [44]
				caption: 'Central Bonk Rocks Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [45]
				caption: 'Tree Line Tree 2',
				is_opened: false,
				is_available: function() {
					return items.agahnim && canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [46]
				caption: 'Tree Line Tree 4',
				is_opened: false,
				is_available: function() {
					return items.agahnim && canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [47]
				caption: 'Flute Boy Approach South Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [48]
				caption: 'Flute Boy Approach North Tree',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() ? 'bonkable' : 'unbonkable';
				}
			}, { // [49]
				caption: 'Dark Lumberjack Tree',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && (canGetBonkableItem()) && canReachNWDW() ? 'bonkable' : 'unbonkable';
				}
			}, { // [50]
				caption: 'Dark Fortune Bonk Rocks (2)',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && canGetBonkableItem() && canReachNWDW() ? 'bonkable' : 'unbonkable';
				}
			}, { // [51]
				caption: 'Dark Graveyard West Bonk Rock',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && canGetBonkableItem() && canReachNWDW() ? 'bonkable' : 'unbonkable';
				}
			}, { // [52]
				caption: 'Dark Graveyard North Bonk Rocks',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && canGetBonkableItem() && canReachNWDW() ? 'bonkable' : 'unbonkable';
				}
			}, { // [53]
				caption: 'Dark Graveyard Tomb Bonk Rocks',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && canGetBonkableItem() && canReachNWDW() ? 'bonkable' : 'unbonkable';
				}
			}, { // [54]
				caption: 'Qirn Jump West Tree',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && canGetBonkableItem() && canReachNWDW() ? 'bonkable' : 'unbonkable';
				}
			}, { // [55]
				caption: 'Qirn Jump East Tree',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && canGetBonkableItem() && canReachNEDW() && (items.flippers || items.glove || items.hammer) ? 'bonkable' : 'unbonkable';
				}
			}, { // [56]
				caption: 'Dark Witch Tree',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && canGetBonkableItem() && canReachNEDW() && (items.flippers || items.glove || items.hammer) ? 'bonkable' : 'unbonkable';
				}
			}, { // [57]
				caption: 'Pyramid Tree',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && canGetBonkableItem() && canReachNEDW() ? 'bonkable' : 'unbonkable';
				}
			}, { // [58]
				caption: 'Palace of Darkness Tree',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && canGetBonkableItem() && canReachNEDW() ? 'bonkable' : 'unbonkable';
				}
			}, { // [59]
				caption: 'Dark Tree Line Tree 2',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && canGetBonkableItem() && canReachNEDW() ? 'bonkable' : 'unbonkable';
				}
			}, { // [60]
				caption: 'Dark Tree Line Tree 3',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && canGetBonkableItem() && canReachNEDW() ? 'bonkable' : 'unbonkable';
				}
			}, { // [61]
				caption: 'Dark Tree Line Tree 4',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && canGetBonkableItem() && canReachNEDW() ? 'bonkable' : 'unbonkable';
				}
			}, { // [62]
				caption: 'Hype Cave Statue',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && canGetBonkableItem() && canReachNWDW() ? 'bonkable' : 'unbonkable';
				}
			}, { // [63]
				caption: 'Cold Fairy Statue',
				is_opened: false,
				is_available: function() {
					return canGetBonkableItem() && items.bomb ? 'bonkable' : 'unbonkable';
				}
			}, { // [64]
				caption: 'Treasure Chest Minigame: Pay 30 rupees',
				is_opened: false,
				is_available: function() {
					return can_reach_outcast() ? 'available' : 'unavailable';
				}
			}, { // [65]
				caption: 'Bottle Vendor: Pay 100 rupees',
				is_opened: false,
				is_available: always
			}, { // [66]
				caption: 'Sahasrahla {pendant0}',
				is_opened: false,
				is_available: function() {
					for (var k = 0; k < 10; k++) {
						if (prizes[k] === 1 && items['boss'+k])
							return 'available';
					}
					return 'unavailable';
				}
			}, { // [67]
				caption: 'Ol\' Stumpy',
				is_opened: false,
				is_available: function() {
					return can_reach_outcast() || items.agahnim && items.moonpearl && items.hammer ? 'available' : 'unavailable';
				}
			}, { // [68]
				caption: 'Lazy Drunk Kid: Distract him with {bottle} because he can\'t lay off the sauce!',
				is_opened: false,
				is_available: function() {
					return items.bottle ? 'available' : 'unavailable';
				}
			}, { // [69]
				caption: 'Gary\'s Lunchbox (save the frog first)',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && items.glove === 2 ? 'available' : 'unavailable';
				}
			}, { // [70]
				caption: 'Fugitive under the bridge {flippers}',
				is_opened: false,
				is_available: function() {
					return items.flippers ? 'available' : 'unavailable';
				}
			}, { // [71]
				caption: 'Ether Tablet {sword2}{book}',
				is_opened: false,
				is_available: function() {
					return items.book && (items.glove || items.flute) && (items.mirror || items.hookshot && items.hammer) ?
						(items.sword >= 2 || (flags.swordmode === 'S' && items.hammer)) ?
							items.lantern || items.flute ? 'available' : 'darkavailable' :
							'information' :
						'unavailable';
				}
			}, { // [72]
				caption: 'Bombos Tablet {mirror}{sword2}{book}',
				is_opened: false,
				is_available: function() {
					return items.book && items.mirror && (can_reach_outcast() || items.agahnim && items.moonpearl && items.hammer) ?
						(items.sword >= 2 || (flags.swordmode === 'S' && items.hammer))? 'available' : 'information' :
						'unavailable';
				}
			}, { // [73]
				caption: 'Catfish',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && items.glove && (items.agahnim || items.hammer || items.glove === 2 && items.flippers) ?
						'available' : 'unavailable';
				}
			}, { // [74]
				caption: 'King Zora: Pay 500 rupees',
				is_opened: false,
				is_available: function() {
					return items.flippers || items.glove ? 'available' : 'unavailable';
				}
			}, { // [75]
				caption: 'Lost Old Man {lantern}',
				is_opened: false,
				is_available: function() {
					return items.glove || items.flute ?
						items.lantern ? 'available' : 'darkavailable' :
						'unavailable';
				}
			}, { // [76]
				caption: 'Witch: Give her {mushroom}',
				is_opened: false,
				is_available: function() {
					return items.mushroom ? 'available' : 'unavailable';
				}
			}, { // [77]
				caption: 'Forest Hideout',
				is_opened: false,
				is_available: always
			}, { // [78]
				caption: 'Lumberjack Tree {agahnim}{boots}',
				is_opened: false,
				is_available: function() {
					return items.agahnim && items.boots ? 'available' : 'information';
				}
			}, { // [79]
				caption: 'Spectacle Rock Cave',
				is_opened: false,
				is_available: function() {
					return items.glove || items.flute ?
						items.lantern || items.flute ? 'available' : 'darkavailable' :
						'unavailable';
				}
			}, { // [80]
				caption: 'South of Grove {mirror}',
				is_opened: false,
				is_available: function() {
					return items.mirror && (can_reach_outcast() || items.agahnim && items.moonpearl && items.hammer) ? 'available' : 'unavailable';
				}
			}, { // [81]
				caption: 'Graveyard Cliff Cave {mirror} {bomb}',
				is_opened: false,
				is_available: function() {
					return can_reach_outcast() && items.mirror && items.bomb ? 'available' : 'unavailable';
				}
			}, { // [82]
				caption: 'Checkerboard Cave {mirror}',
				is_opened: false,
				is_available: function() {
					return items.flute && items.glove === 2 && items.mirror ? 'available' : 'unavailable';
				}
			}, { // [83]
				caption: '{hammer}{hammer}{hammer}{hammer}{hammer}{hammer}{hammer}{hammer}!!!!!!!!',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && items.glove === 2 && items.hammer ? 'available' : 'unavailable';
				}
			}, { // [84]
				caption: 'Library {boots}',
				is_opened: false,
				is_available: function() {
					return items.boots ? 'available' : 'information';
				}
			}, { // [85]
				caption: 'Mushroom',
				is_opened: false,
				is_available: always
			}, { // [86]
				caption: 'Spectacle Rock {mirror}',
				is_opened: false,
				is_available: function() {
					return items.glove || items.flute ?
						items.mirror ?
							items.lantern || items.flute ? 'available' : 'darkavailable' :
							'information' :
						'unavailable';
				}
			}, { // [87]
				caption: 'Floating Island {bomb} {mirror}',
				is_opened: false,
				is_available: function() {
					return (items.glove || items.flute) && (items.hookshot || items.hammer && items.mirror) ?
						items.mirror && items.moonpearl && items.glove === 2 && items.bomb ?
							items.lantern || items.flute ? 'available' : 'darkavailable' :
							'information' :
						'unavailable';
				}
			}, { // [88]
				caption: 'Race Minigame {bomb}/{boots}',
				is_opened: false,
				is_available: function() {
					return items.bomb || items.boots || (items.mirror && (can_reach_outcast() || (items.agahnim && items.moonpearl && items.hammer))) ? 'available' : 'information';
				}
			}, { // [89]
				caption: 'Desert West Ledge {book}/{mirror}',
				is_opened: false,
				is_available: function() {
					//return items.book || items.flute && items.glove === 2 && items.mirror ? 'available' : 'information';
					if(items.flute && items.glove === 2 && items.mirror)
						return 'available';
					if(!items.book)
						return 'information';
					if(flags.doorshuffle != 'N')
						return 'possible';
					//var doorcheck = window.doorCheck(1,false,false,false,['boots','firesource'],'connector');
					//if(doorcheck)
					//	return doorcheck;
					return 'available';
				}
			}, { // [90]
				caption: 'Lake Hylia Island {mirror}',
				is_opened: false,
				is_available: function() {
					return items.flippers ?
						items.moonpearl && items.mirror && (items.agahnim || items.glove === 2 || items.glove && items.hammer) ?
							'available' : 'information' :
						'information';
				}
			}, { // [91]
				caption: 'Bumper Cave {cape}',
				is_opened: false,
				is_available: function() {
					return can_reach_outcast() ?
						items.glove && items.cape ? 'available' : 'information' :
						'unavailable';
				}
			}, { // [92]
				caption: 'Pyramid',
				is_opened: false,
				is_available: function() {
					return items.agahnim || items.glove && items.hammer && items.moonpearl ||
						items.glove === 2 && items.moonpearl && items.flippers ? 'available' : 'unavailable';
				}
			}, { // [93]
				caption: 'Alec Baldwin\'s Dig-a-Thon: Pay 80 rupees',
				is_opened: false,
				is_available: function() {
					return can_reach_outcast() || items.agahnim && items.moonpearl && items.hammer ? 'available' : 'unavailable';
				}
			}, { // [94]
				caption: 'Zora River Ledge {flippers}',
				is_opened: false,
				is_available: function() {
					if (items.flippers) return 'available';
					if (items.glove) return 'information';
					return 'unavailable';
				}
			}, { // [95]
				caption: 'Buried Itam {shovel}',
				is_opened: false,
				is_available: function() {
					return items.shovel ? 'available' : 'unavailable';
				}
			}, { // [96]
				caption: 'Escape Sewer Side Room (3) {bomb}/{boots}' + (flags.gametype === 'S' ? '' : ' (may need small key)'),
				is_opened: false,
				is_available: function() {
					var doorcheck = window.doorCheck(11,false,false,flags.gametype != 'S',['glove','killbomb','bombdash'],'item');
					if(doorcheck)
						return doorcheck;
					if (!items.bomb && !items.boots) return 'unavailable';
					if (flags.gametype === 'S') return 'available';
					if (flags.wildkeys || flags.gametype == 'R') {
						if (items.glove) return 'available';
						if (items.bomb || melee_bow() || items.firerod || cane()) {
							if (items.smallkeyhalf0 === 1 || flags.gametype == 'R') return canDoTorchDarkRooms() ? 'available' : 'darkavailable';
						}
						return 'unavailable';
					}
					
					return items.glove ? 'available' : (items.bomb || melee_bow() || rod() || cane() ? (canDoTorchDarkRooms() ? 'possible' : 'darkpossible') : 'unavailable');
				}
			}, { // [97]
				caption: "Castle Secret Entrance (Uncle + 1)",
				is_opened: flags.gametype === 'S',
				is_available: always
			}, { // [98]
				caption: 'Hyrule Castle Dungeon (3)',
				is_opened: flags.gametype === 'S' && flags.doorshuffle === 'N',
				is_available: function() {
					var doorcheck = window.doorCheck(11,false,false,flags.gametype != 'S',['glove','killbomb','bombdash'],'item');
					if(doorcheck)
						return doorcheck;
					return items.bomb || melee_bow() || items.firerod || cane() ? 'available' : 'partialavailable';
				}
			}, { // [99]
				caption: 'Sanctuary',
				is_opened: flags.gametype === 'S',
				is_available: always
			}, { // [100]
				caption: 'Mad Batter {hammer}/{mirror} + {powder}',
				is_opened: false,
				is_available: function() {
					return items.powder && (items.hammer || items.glove === 2 && items.mirror && items.moonpearl) ? 'available' : 'unavailable';
				}
			}, { // [101]
				caption: 'Take the frog home {mirror} / Save+Quit',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && items.glove === 2 ? 'available' : 'unavailable';
				}
			}, { // [102]
				caption: 'Fat Fairy: Buy OJ bomb from Dark Link\'s House after {crystal}5 {crystal}6 (2 items)',
				is_opened: false,
				is_available: function() {
					//crystal check
					var crystal_count = 0;
					for (var k = 0; k < 10; k++) {
						if (prizes[k] === 4 && items['boss'+k])
							crystal_count += 1;
					}

					if (!items.moonpearl || crystal_count < 2) return 'unavailable';
					return items.hammer && (items.agahnim || items.glove) ||
						items.agahnim && items.mirror && can_reach_outcast() ? 'available' : 'unavailable';
				}
			}, { // [103]
				caption: 'Master Sword Pedestal {pendant0}{pendant1}{pendant2} (can check with {book})',
				is_opened: false,
				is_available: function() {
					var pendant_count = 0;
					for (var k = 0; k < 10; k++) {
						if ((prizes[k] === 1 || prizes[k] === 2) && items['boss'+k]) {
							if (++pendant_count === 3) return 'available';
						}
					}
					return items.book ? 'information' : 'unavailable';
				}
			}, { // [104]
				caption: 'Escape Sewer Dark Room {lantern}',
				is_opened: flags.gametype === 'S' && flags.doorshuffle === 'N',
				is_available: function() {
					var doorcheck = window.doorCheck(11,false,false,flags.gametype != 'S',['glove','killbomb','bombdash'],'item');
					if(doorcheck)
						return doorcheck;
					return flags.gametype === 'S' || canDoTorchDarkRooms() ? 'available' : 'darkavailable';
				}
			}, { // [105]
				caption: 'Waterfall of Wishing (2) {flippers}',
				is_opened: false,
				is_available: function() {
					return items.flippers ? 'available' : 'unavailable';
				}
			}, { // [106]
				caption: 'Castle Tower',
				is_opened: false,
				is_available: function() {
					//return items.sword >= 2 || (flags.swordmode === 'S' && items.hammer) || items.cape ? 'available' : 'unavailable';
					if(items.sword < 2 && (flags.swordmode != 'S' || !items.hammer) && !items.cape && !items.agahnim)
						return 'unavailable';
					//var doorcheck = window.doorCheck(11,false,false,flags.gametype != 'S',['glove'],'connector');
					//if(doorcheck)
					if(flags.doorshuffle != 'N')
					{
						//if(doorcheck === 'possible')
						//	return 'possible';
						if(items.mirror && (items.agahnim || (items.glove && items.hammer && items.moonpearl) || (items.glove === 2 && items.moonpearl && items.flippers)))
							return window.doorCheck(12,false,true,true,['kill','swordorswordless'],'item');
						return 'possible';
					}
					if(!items.bomb && !melee_bow() && !cane() && !items.firerod)
						return 'unavailable';
					return 'available';
				}
			}, { // [107]
				caption: 'Castle Tower (small key)',
				is_opened: false,
				is_available: function() {
					//if (flags.gametype === 'R') {
					//	return (items.sword >= 2 || (flags.swordmode === 'S' && items.hammer) || items.cape) ? items.lantern ? 'available' : 'darkavailable' : 'unavailable';
					//} else {
					//	return (items.sword >= 2 || (flags.swordmode === 'S' && items.hammer) || items.cape) && (items.smallkeyhalf1 > 0 || flags.gametype == 'R') ? items.lantern ? 'available' : 'darkavailable' : 'unavailable';
					//}
					if(items.sword < 2 && (flags.swordmode != 'S' || !items.hammer) && !items.cape && !items.agahnim)
						return 'unavailable';
					if(flags.doorshuffle != 'N')
					{
						if(items.mirror && (items.agahnim || (items.glove && items.hammer && items.moonpearl) || (items.glove === 2 && items.moonpearl && items.flippers)))
							return window.doorCheck(12,false,true,true,['kill','swordorswordless'],'item');
						return 'possible';
					}
					if(!items.bomb && !melee_bow() && !cane() && !items.firerod)
						return 'unavailable';
					return items.smallkeyhalf1 > 0 || flags.gametype === 'R' ? items.lantern ? 'available' : 'darkavailable' : 'unavailable';
				}
			}, { // [108]
				caption: 'Lake Hylia Shop (3)',
				is_opened: false,
				is_available: always
			}, { // [109]
				caption: 'Kakariko Shop (3)',
				is_opened: false,
				is_available: always
			}, { // [110]
				caption: 'Paradox Shop (3) {bomb}',
				is_opened: false,
				is_available: function() {
					return items.bomb && (items.glove || items.flute) && (items.hookshot || items.mirror && items.hammer) ?
					items.lantern || items.flute ? 'available' : 'darkavailable' :
					'unavailable';
				}
			}, { // [111]
				caption: 'Dark Lake Hylia Shop (3)',
				is_opened: false,
				is_available: function() {
					return can_reach_outcast() || (items.agahnim && items.moonpearl && items.hammer) ? 'available' : 'unavailable';
				}
			}, { // [112]
				caption: 'Village of Outcasts Shop (3) {hammer}',
				is_opened: false,
				is_available: function() {
					return can_reach_outcast() && items.hammer ? 'available' : 'unavailable';
				}
			}, { // [113]
				caption: 'Dark Death Mountain Shop (3)',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && items.glove === 2 && (items.hookshot || (items.mirror && items.hammer)) ?
						items.lantern || items.flute ? 'available' : 'darkavailable' : 'unavailable';
				}
			}, { // [114]
				caption: 'Dark Potion Shop (3)',
				is_opened: false,
				is_available: function() {
					return items.moonpearl && ((items.agahnim && (items.flippers || items.hammer || items.glove)) || (items.hammer && items.glove) || (items.glove === 2 && items.flippers)) ?
						'available' : 'unavailable';
				}
			}, { // [115]
				caption: 'Dark Lumberjack Shop (3)',
				is_opened: false,
				is_available: function() {
					return can_reach_outcast() ? 'available' : 'unavailable';
				}
			}, { // [116]
				caption: 'Curiosity Shop (3)',
				is_opened: false,
				is_available: function() {
					return can_reach_outcast() ? 'available' : 'unavailable';
				}
			}, { // [117]
				caption: 'Potion Shop (3)',
				is_opened: false,
				is_available: always
			}, { // [118]
				caption: 'Pond of Happiness (2)',
				is_opened: false,
				is_available: function() {
					return items.flippers ? 'available' : 'unavailable';
				}
			}, { // [119]
				caption: 'Bomb Shop (2)',
				is_opened: false,
				is_available: function() {
					return can_reach_outcast() || (items.agahnim && items.moonpearl && items.hammer) ? 'available' : 'unavailable';
				}
			}];
		}
	};
	
}(window));
