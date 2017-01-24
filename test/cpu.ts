/// <reference path="../typings/index.d.ts" />
import {expect} from 'chai';
import * as compy from '../src/virtualprocessor'

describe('virtual processor', () => {

  it('Should create a new processor given the parameters', () => {
    var startingMemory = new compy.Memory([3, 8, 5, 1]);
    var startingCpu = new compy.Processor(1, 2, 3, 4, 3, startingMemory);
    expect(startingCpu.program_counter).to.equal(1);
    expect(startingCpu.registerA).to.equal(2);
    expect(startingCpu.registerB).to.equal(3);
    expect(startingCpu.registerC).to.equal(4);
    expect(startingCpu.stack_pointer).to.equal(3);
    expect(startingCpu.memory).to.equal(startingMemory); //should be true
  })

  it('Should copy a processor', () => {
    var startingMemory = new compy.Memory([9, 5, 5, 8]);
    var startingCpu = new compy.Processor(1, 2, 3, 4, 9, startingMemory);
    var cpuCopy = startingCpu.copy();
    expect(cpuCopy.program_counter).to.equal(1);
    expect(cpuCopy.registerA).to.equal(2);
    expect(cpuCopy.registerB).to.equal(3);
    expect(cpuCopy.registerC).to.equal(4);
    expect(cpuCopy.stack_pointer).to.equal(9);
    expect(cpuCopy.memory).to.equal(startingMemory);
  })

  it('Should load data into registers', () => {
    var startingMemory = new compy.Memory([3, 1, 4, 1, 5, 8, 2, 6, 5, 3, 5]);
    var startingCpu = new compy.Processor(0, 0, 0, 0, startingMemory.data.length - 1, startingMemory);
    var nextStepCpu = compy.loadRegister(startingCpu, "registerA", 1);
    expect(nextStepCpu.registerA).to.equal(1);
  })

  it('Should load data into registers from memory', () => {
    var startingMemory = new compy.Memory([3, 1, 4, 1, 5, 8, 2, 6, 5, 3, 5]);
    var startingCpu = new compy.Processor(0, 0, 0, 0, startingMemory.data.length, startingMemory);
    var nextStepCpu = compy.loadRegisterFromMemory(startingCpu, "registerA", 0);
    expect(nextStepCpu.registerA).to.equal(3); //this and more! <-- next step, as of Monday, January 23rd
  })

  // advanceProgramCounter();
  it('Copy the processor and increment Processor.program_counter by adding 1', () => {
    var startingMemory = new compy.Memory([3, 1, 4, 1, 5, 8, 2, 6, 5, 3, 5]);
    var startingCpu = new compy.Processor(0, 0, 0, 0, startingMemory.data.length - 1, startingMemory);

    var advanceCpu = compy.advanceProgramCounter(startingCpu);
    // assertion that that program_counter is incremented by 1. do this by
    //     comparing the original to the copy.
    expect(advanceCpu.program_counter).to.equal(startingCpu.program_counter + 1);
});



/*
> startingCpu
Processor {
  program_counter: 0,
  registerA: 0,
  registerB: 0,
  registerC: 0,
  stack_pointer: 11,
  memory: Memory { data: [ 3, 1, 4, 1, 5, 8, 2, 6, 5, 3, 5 ] } }

*/
