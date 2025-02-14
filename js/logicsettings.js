const logicCheckboxes = document.querySelectorAll("input.logiccheckbox");

const allLogic = {
  "canIceBreak": true,
  "canHookClip": true,
  "canBombJump": true,
  "canBombOrBonkCameraUnlock": true,
  "canHover": true,
  "canHoverAlot": true,
  "canSpeckyClip": true,
  "canFireSpooky": true,
  "canBombSpooky": true,
  "canHeraPot": true,
  "canMimicClip": true,
  "canPotionCameraUnlock": true,
  "canMoldormBounce": true,
  "canDarkRoomNavigateBlind": true,
  "canTorchRoomNavigateBlind": true,
  "canFairyReviveHover": true,
  "canFakeFlipper": true,
  "canOWFairyRevive": true,
  "canQirnJump": true,
  "canMirrorSuperBunny": true,
  "canDungeonBunnyRevive": true,
  "canFakePowder": true,
  "canWaterWalk": true,
  "canZoraSplashDelete": true,
  "canBunnyPocket": true,
  "canFairyBarrierRevive": true,
  "canShockBlock": true,
  "canTombRaider": true,
  "canIBJ": true,
  "canGravityJump": true,
  "canGateGlitch": true,
  "canSpringBallJump": true,
  "canCrystalFlash": true,
  "canGauntletWalljumps": true,
  "canAlcatrazEscape": true,
  "canOldMBWithSpeed": true,
  "canEarlySupersBridgeQuickdrop": true,
  "canTrivialMockball": true,
  "canHoleInOne": true,
  "canHiJumpWaveGateGlitch": true,
  "canHiJumplessWaveGateGlitch": true,
  "canSporeSpawnSkip": true,
  "canCeilingDboost": true,
  "canClimbRedTower": true,
  "canSpongeBathBombJump": true,
  "canBowlingSkip": true,
  "canMoatCWJ": true,
  "canMoatHBJ": true,
  "canXrayDboost": true,
  "canSuitlessMaridia": true,
  "canBootlessSuitless": true,
  "canUnderwaterWallJump": true,
  "canHijumpIceMainStreetClimb": true,
  "canCrabClimb": true,
  "canTurtlePowerBombJump": true,
  "canSnailClip": true,
  "canBreakFree": true,
  "canMochtroidIceClip": true,
  "canGrappleJump": true,
  "canSnailClimb": true,
  "canDoubleSpringBallJump": true,
  "canBombCrystalFlashClip": true,
  "canSuitlessCrystalFlashClip": true,
  "canCrossColosseumSuitlessWithIce": true,
  "canGrappleEscapeDraygon": true,
  "canHijumplessGrappleEscapeDraygon": true,
  "canBlueSuitDraygon": true,
  "canCFSuitAndAmmoKillDraygon": true,
  "canXrayClimb": true,
  "canWestSandHallBombJump": true,
  "canPseudoScrewPlasmaPirates": true,
  "canSparkPlasmaPirates": true,
  "canPantsRoomGravJump": true,
  "canPantsRoomIceClip": true,
  "canPantsRoomFlatley": true,
  "canRJump": true,
  "canShortHellrun": true,
  "canHellrun": true,
  "canLowerNorfairHellrun": true,
  "canIceEscape": true,
  "canIcelessIceEscape": true,
  "canReverseSparkCrocSpeedway": true,
  "canNovaBoost": true,
  "canNorfairReserveDBoost": true,
  "canCrocFarmRoomDBoost": true,
  "canNeatoSpringBallJump": true,
  "canLavaDive": true,
  "canBootlessLavaDive": true,
  "canSuitlessLavaDive": true,
  "canHijumpSpeedScrewAttackRoomClimb": true,
  "canWRITGPirateFreeze": true,
  "canHypoJump": true,
  "canReverseAcidDive": true,
  "canShortCharge": true,
  "canStupidShortCharge": true,

};

const noStupid = {
  "canIceBreak": true,
  "canHookClip": true,
  "canBombJump": true,
  "canBombOrBonkCameraUnlock": true,
  "canHover": true,
  "canHoverAlot": false,
  "canSpeckyClip": true,
  "canFireSpooky": true,
  "canBombSpooky": true,
  "canHeraPot": true,
  "canMimicClip": true,
  "canPotionCameraUnlock": true,
  "canMoldormBounce": true,
  "canDarkRoomNavigateBlind": true,
  "canTorchRoomNavigateBlind": true,
  "canFairyReviveHover": false,
  "canFakeFlipper": true,
  "canOWFairyRevive": false,
  "canQirnJump": true,
  "canMirrorSuperBunny": true,
  "canDungeonBunnyRevive": true,
  "canFakePowder": true,
  "canWaterWalk": true,
  "canZoraSplashDelete": true,
  "canBunnyPocket": true,
  "canFairyBarrierRevive": false,
  "canShockBlock": false,
  "canTombRaider": true,
  "canIBJ": true,
  "canGravityJump": true,
  "canGateGlitch": true,
  "canSpringBallJump": true,
  "canCrystalFlash": true,
  "canGauntletWalljumps": true,
  "canAlcatrazEscape": true,
  "canOldMBWithSpeed": false,
  "canEarlySupersBridgeQuickdrop": true,
  "canTrivialMockball": true,
  "canHoleInOne": true,
  "canHiJumpWaveGateGlitch": true,
  "canHiJumplessWaveGateGlitch": true,
  "canSporeSpawnSkip": true,
  "canCeilingDboost": true,
  "canClimbRedTower": true,
  "canSpongeBathBombJump": true,
  "canBowlingSkip": false,
  "canMoatCWJ": true,
  "canMoatHBJ": true,
  "canXrayDboost": false,
  "canSuitlessMaridia": true,
  "canBootlessSuitless": false,
  "canUnderwaterWallJump": false,
  "canHijumpIceMainStreetClimb": true,
  "canCrabClimb": false,
  "canTurtlePowerBombJump": false,
  "canSnailClip": true,
  "canBreakFree": false,
  "canMochtroidIceClip": true,
  "canGrappleJump": true,
  "canSnailClimb": false,
  "canDoubleSpringBallJump": false,
  "canBombCrystalFlashClip": false,
  "canSuitlessCrystalFlashClip": false,
  "canCrossColosseumSuitlessWithIce": false,
  "canGrappleEscapeDraygon": false,
  "canHijumplessGrappleEscapeDraygon": false,
  "canBlueSuitDraygon": false,
  "canCFSuitAndAmmoKillDraygon": false,
  "canXrayClimb": false,
  "canWestSandHallBombJump": false,
  "canPseudoScrewPlasmaPirates": true,
  "canSparkPlasmaPirates": true,
  "canPantsRoomGravJump": true,
  "canPantsRoomIceClip": true,
  "canPantsRoomFlatley": false,
  "canRJump": false,
  "canShortHellrun": true,
  "canHellrun": true,
  "canLowerNorfairHellrun": true,
  "canIceEscape": true,
  "canIcelessIceEscape": false,
  "canReverseSparkCrocSpeedway": true,
  "canNovaBoost": false,
  "canNorfairReserveDBoost": true,
  "canCrocFarmRoomDBoost": false,
  "canNeatoSpringBallJump": false,
  "canLavaDive": true,
  "canBootlessLavaDive": false,
  "canSuitlessLavaDive": false,
  "canHijumpSpeedScrewAttackRoomClimb": true,
  "canWRITGPirateFreeze": false,
  "canHypoJump": false,
  "canReverseAcidDive": true,
  "canShortCharge": true,
  "canStupidShortCharge": false,
};

const basicLogic = {
  "canIceBreak": true,
  "canHookClip": true,
  "canBombJump": true,
  "canBombOrBonkCameraUnlock": false,
  "canHover": false,
  "canHoverAlot": false,
  "canSpeckyClip": true,
  "canFireSpooky": true,
  "canBombSpooky": false,
  "canHeraPot": true,
  "canMimicClip": true,
  "canPotionCameraUnlock": true,
  "canMoldormBounce": false,
  "canDarkRoomNavigateBlind": true,
  "canTorchRoomNavigateBlind": true,
  "canFairyReviveHover": false,
  "canFakeFlipper": true,
  "canOWFairyRevive": false,
  "canQirnJump": true,
  "canMirrorSuperBunny": true,
  "canDungeonBunnyRevive": true,
  "canFakePowder": true,
  "canWaterWalk": true,
  "canZoraSplashDelete": true,
  "canBunnyPocket": false,
  "canFairyBarrierRevive": false,
  "canShockBlock": false,
  "canTombRaider": true,
  "canIBJ": true,
  "canGravityJump": true,
  "canGateGlitch": true,
  "canSpringBallJump": true,
  "canCrystalFlash": true,
  "canGauntletWalljumps": true,
  "canAlcatrazEscape": true,
  "canOldMBWithSpeed": false,
  "canEarlySupersBridgeQuickdrop": false,
  "canTrivialMockball": true,
  "canHoleInOne": false,
  "canHiJumpWaveGateGlitch": true,
  "canHiJumplessWaveGateGlitch": true,
  "canSporeSpawnSkip": true,
  "canCeilingDboost": true,
  "canClimbRedTower": true,
  "canSpongeBathBombJump": false,
  "canBowlingSkip": false,
  "canMoatCWJ": true,
  "canMoatHBJ": true,
  "canXrayDboost": false,
  "canSuitlessMaridia": false,
  "canBootlessSuitless": false,
  "canUnderwaterWallJump": false,
  "canHijumpIceMainStreetClimb": false,
  "canCrabClimb": false,
  "canTurtlePowerBombJump": false,
  "canSnailClip": true,
  "canBreakFree": false,
  "canMochtroidIceClip": true,
  "canGrappleJump": true,
  "canSnailClimb": false,
  "canDoubleSpringBallJump": false,
  "canBombCrystalFlashClip": false,
  "canSuitlessCrystalFlashClip": false,
  "canCrossColosseumSuitlessWithIce": false,
  "canGrappleEscapeDraygon": false,
  "canHijumplessGrappleEscapeDraygon": false,
  "canBlueSuitDraygon": false,
  "canCFSuitAndAmmoKillDraygon": false,
  "canXrayClimb": false,
  "canWestSandHallBombJump": false,
  "canPseudoScrewPlasmaPirates": false,
  "canSparkPlasmaPirates": false,
  "canPantsRoomGravJump": false,
  "canPantsRoomIceClip": false,
  "canPantsRoomFlatley": false,
  "canRJump": false,
  "canShortHellrun": false,
  "canHellrun": false,
  "canLowerNorfairHellrun": true,
  "canIceEscape": false,
  "canIcelessIceEscape": false,
  "canReverseSparkCrocSpeedway": false,
  "canNovaBoost": false,
  "canNorfairReserveDBoost": false,
  "canCrocFarmRoomDBoost": false,
  "canNeatoSpringBallJump": false,
  "canLavaDive": false,
  "canBootlessLavaDive": false,
  "canSuitlessLavaDive": false,
  "canHijumpSpeedScrewAttackRoomClimb": false,
  "canWRITGPirateFreeze": false,
  "canHypoJump": false,
  "canReverseAcidDive": false,
  "canShortCharge": true,
  "canStupidShortCharge": false,
};

// Save logic settings to local storage
const savelogicSettings = () => {
  var logicSettings = {};
  const logicCheckboxes = document.querySelectorAll("input.logiccheckbox");
  if (logicCheckboxes.length !== 0) {
    logicCheckboxes.forEach((item) => {
      logicSettings[item.getAttribute("id")] = item.checked;
    });
  } else {
    logicSettings = basicLogic;
  }
  localStorage.setItem("logicSettings", JSON.stringify(logicSettings));
};

const setAlllogics = (preset) => {
  let logicSettings;
  switch (preset) {
    case "all":
      logicSettings = allLogic;
      break;
    case "nostupid":
      logicSettings = noStupid;
      break;
    case "basic":
      logicSettings = basicLogic;
      break;
    default:
      logicSettings = {};
      Object.keys(basicLogic).forEach((item) => {
        logicSettings[item] = false;
      });
      logicSettings['canIBJ'] = true;
      logicSettings['canCrystalFlash'] = true;
  }
  logicCheckboxes.forEach((item) => {
    item.checked = logicSettings[item.getAttribute("id")];
  });
  savelogicSettings();
};

const loadedlogicSettings = localStorage.getItem("logicSettings");
if (loadedlogicSettings) {
  const logicSettings = JSON.parse(loadedlogicSettings);
  logicCheckboxes.forEach((item) => {
    item.checked = logicSettings[item.getAttribute("id")];
  });
} else {
  setAlllogics("basic");
}

const handleSaveBack = () => {
  savelogicSettings();
  window.location.href = "index.html";
}