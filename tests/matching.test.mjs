import {test} from 'node:test'
import assert from 'node:assert/strict'
import {publicMatchInput,validateMatches,sampleOpportunities} from '../lib/matching.ts'
import {field,choice,uuid} from '../lib/validation.ts'
test('matching rejects private projects and excludes internal fields',()=>{
 assert.throws(()=>publicMatchInput({visibility:'private'}))
 const input=publicMatchInput({visibility:'public',title:'A story',synopsis:'Public synopsis',owner_id:'secret',documents:['private.pdf'],private_notes:'hidden'})
 assert.equal(input.title,'A story');assert.ok(!('owner_id' in input));assert.ok(!('documents' in input));assert.ok(!('private_notes' in input))
})
test('AI output rejects invented candidates, duplicates and malformed explanations',()=>{
 const match={id:sampleOpportunities[0].id,explanation:'Fits the supplied film and heritage interests.',caveat:'Budget is not specified.'}
 assert.deepEqual(validateMatches({matches:[match]},sampleOpportunities),[match])
 assert.deepEqual(validateMatches({matches:[]},sampleOpportunities),[])
 for(const value of [{matches:[{...match,id:'invented'}]},{matches:[match,match]},{matches:[{...match,explanation:12}]},{matches:[{...match,caveat:'x'.repeat(1001)}]},{matches:[...Array(6)].map(()=>match)},null])assert.throws(()=>validateMatches(value,sampleOpportunities))
})
test('form validation rejects invalid identifiers and choices without trimming passwords',()=>{
 const form=new FormData();form.set('password','  my password  ');assert.equal(field(form,'password',256,true),'  my password  ')
 form.set('visibility','hidden');assert.throws(()=>choice(form,'visibility',['public','private']))
 assert.throws(()=>uuid('../documents'));assert.throws(()=>field(form,'title',100,true))
})
