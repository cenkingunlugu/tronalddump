import { SurpriseDirective } from './surprise.directive';

describe('SurpriseDirective', () => {
  it('should create an instance', () => {
    const directive = new SurpriseDirective();
    expect(directive).toBeTruthy();
  });

  it('should handle keydown event as expected', () => {
    const directive = new SurpriseDirective();
    spyOn(directive.surprise, 'emit').and.callThrough();
    const eventForT = new KeyboardEvent('keydown', { code: '84' });
    directive.handleKeyboardEvent(eventForT);
    expect(directive.surprise.emit).not.toHaveBeenCalled();
    const eventForR = new KeyboardEvent('keydown', { code: '82' });
    directive.handleKeyboardEvent(eventForR);
    expect(directive.surprise.emit).not.toHaveBeenCalled();
    const eventForO = new KeyboardEvent('keydown', { code: '79' });
    directive.handleKeyboardEvent(eventForO);
    expect(directive.surprise.emit).not.toHaveBeenCalled();
    const eventForN = new KeyboardEvent('keydown', { code: '78' });
    directive.handleKeyboardEvent(eventForN);
    expect(directive.surprise.emit).not.toHaveBeenCalled();
    const eventForA = new KeyboardEvent('keydown', { code: '65' });
    directive.handleKeyboardEvent(eventForA);
    expect(directive.surprise.emit).not.toHaveBeenCalled();
    const eventForL = new KeyboardEvent('keydown', { code: '76' });
    directive.handleKeyboardEvent(eventForL);
    expect(directive.surprise.emit).not.toHaveBeenCalled();
    const eventForD = new KeyboardEvent('keydown', { code: '68' });
    directive.handleKeyboardEvent(eventForD);
    expect(directive.surprise.emit).toHaveBeenCalled();
    (directive.surprise.emit as jasmine.Spy).calls.reset();
    const eventForX = new KeyboardEvent('keydown', { code: '0' });
    directive.handleKeyboardEvent(eventForX);
    expect(directive.surprise.emit).not.toHaveBeenCalled();
    const eventForNo = new KeyboardEvent('keydown', { });
    directive.handleKeyboardEvent(eventForNo);
    expect(directive.surprise.emit).not.toHaveBeenCalled();
  });
});
