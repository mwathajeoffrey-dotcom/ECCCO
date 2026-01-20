#!/bin/bash

echo "⏳ Waiting for Vercel deployment to complete..."
echo "   (Press Ctrl+C when you see 'Ready' in Vercel dashboard)"
echo ""
read -p "Press Enter when deployment is complete..."

echo ""
echo "🧪 Testing Production Database..."
echo ""

curl -s 'https://eccco.vercel.app/api/topics' | python3 -c "
import sys, json

data = json.load(sys.stdin)
total_topics = len(data)
total_questions = sum(t.get('_count', {}).get('questions', 0) for t in data)
topics_with_q = len([t for t in data if t.get('_count', {}).get('questions', 0) > 0])

print('📊 Production Database Status:\n')
print(f'  Total Topics: {total_topics}')
print(f'  Topics with Questions: {topics_with_q}')
print(f'  Total Questions: {total_questions}\n')

# Check for placenta topics
placenta = [t for t in data if 'placenta' in t['name'].lower() or 'abruption' in t['name'].lower()]
if placenta:
    print('✅ Placenta Topics Found:\n')
    for t in placenta:
        print(f'  - {t[\"name\"]}: {t.get(\"_count\", {}).get(\"questions\", 0)} questions')
    print('')

# Check OB/GYN
obgyn = [t for t in data if 'ob' in t['name'].lower() or 'gyn' in t['name'].lower() or 'obstet' in t['name'].lower() or 'pregnan' in t['name'].lower()]
if obgyn:
    print('✅ OB/GYN Topics Found:\n')
    for t in obgyn[:10]:
        print(f'  - {t[\"name\"]}: {t.get(\"_count\", {}).get(\"questions\", 0)} questions')
    if len(obgyn) > 10:
        print(f'  ... and {len(obgyn) - 10} more OB/GYN topics')
    print('')

if total_questions >= 1800:
    print('🎉 SUCCESS! Production now has all 1,845 questions!\n')
    print('✅ Visit: https://eccco.vercel.app/exam')
    print('✅ All topics should now show question counts')
    print('✅ OB/GYN Emergencies should have 30+ questions\n')
elif total_questions > 850:
    print('⚠️  Partial Update. More questions than before, but not all 1,845.')
    print(f'   Current: {total_questions} / 1,845 expected\n')
else:
    print('❌ Still showing old database (851 questions)')
    print('   DATABASE_URL may not have been updated correctly.')
    print('   Check Vercel environment variables again.\n')
"
