import { create, unitDependencies } from "mathjs";
import capitalize from "lodash/capitalize";

const math = create({
  unitDependencies,
});

math.Unit.createUnit({
  unit: {
    aliases: ["units"],
    baseName: "UNIT",
  },
});

const BASE_UNITS = Object.values(math.Unit.BASE_UNITS);

math.import({
  isSupportedUnit: str => {
    try {
      math.Unit.parse(str);
      return true;
    } catch (err) {
      return false;
    }
  },
  canConvertBetween: (unitA, unitB) => {
    try {
      math.unit(unitA).to(unitB);
      return true;
    } catch (err) {
      return false;
    }
  },
  getUnitBase(unit) {
    try {
      const unitInstance = math.unit(unit);
      const unitBase = BASE_UNITS.find(base => unitInstance.equalBase(base));
      return capitalize(unitBase.key);
    } catch {
      return "?";
    }
  },
});

export default math;
