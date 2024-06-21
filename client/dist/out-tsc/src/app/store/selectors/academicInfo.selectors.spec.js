import * as tslib_1 from "tslib";
import { mockAcademicInfo, mockFormattedAcademicInfoData } from '../../utils/test-utils/mockData';
import { academicSelectors } from './index';
import { academicInfoInitialState } from '../states';
describe('Academic Info selectors ', function () {
    it('should return formatted record when selected id is valid', function () {
        var _a;
        mockAcademicInfo.id = '123456';
        expect(academicSelectors.selectLatest.projector((_a = {}, _a[mockAcademicInfo.id] = mockAcademicInfo, _a), tslib_1.__assign({}, academicInfoInitialState, { selectedId: mockAcademicInfo.id }))).toEqual(mockFormattedAcademicInfoData);
    });
    it('should return null when selected id in invalid', function () {
        var _a;
        expect(academicSelectors.selectLatest.projector((_a = {}, _a[mockAcademicInfo.id] = mockAcademicInfo, _a), tslib_1.__assign({}, academicInfoInitialState, { selectedId: null }))).toEqual(null);
    });
});
//# sourceMappingURL=academicInfo.selectors.spec.js.map