import { dump } from 'enhanced-yaml';
import { joinYaml } from 'enhanced-yaml/tests/utils';

describe('dump', () => {
  describe('Syntax', () => {
    describe('Whitespace', () => {
      it('should preserve the empty line before a node', () => {
        expect(
          dump(
            { a: 100, b: 200 },
            {},
            joinYaml(
              // prettier-ignore
              [
                'a: 1',
                '',
                'b: 2',
              ],
            ),
          ),
        ).toStrictEqual(
          joinYaml(
            // prettier-ignore
            [
              'a: 100',
              '',
              'b: 200',
            ],
          ),
        );
      });
    });
  });
});
