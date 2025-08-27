import connectDB from '../../../lib/mongoose';
   import PendingQuote from '../../../models/PendingQuote';

   const validCategories = [
     "Faith",
     "Motivation",
     "Wisdom",
     "Patience",
     "Guidance",
     "Encouragement",
     "Trust",
     "Self-Discipline",
     "Contentment",
     "Success",
     "Happiness",
   ];

   export async function POST(req) {
     try {
       await connectDB();
       const body = await req.json();

       if (!body.text || !body.author || !body.type || !['mini', 'hero'].includes(body.type)) {
         return new Response(JSON.stringify({ success: false, error: 'Missing or invalid required fields' }), {
           status: 400,
           headers: { 'Content-Type': 'application/json' },
         });
       }

       if (body.type === 'mini') {
         if (!body.imageUrl || typeof body.imageUrl !== 'string' || body.imageUrl.trim() === '') {
           return new Response(JSON.stringify({ success: false, error: 'A valid image URL is required for mini quotes' }), {
             status: 400,
             headers: { 'Content-Type': 'application/json' },
           });
         }
         if (!Array.isArray(body.categories) || body.categories.length === 0) {
           return new Response(JSON.stringify({ success: false, error: 'At least one category is required for mini quotes' }), {
             status: 400,
             headers: { 'Content-Type': 'application/json' },
           });
         }
       }

       // Validate categories
       const filteredCategories = body.type === 'mini' ? body.categories.filter(cat => validCategories.includes(cat)) : [];
       if (body.type === 'mini' && filteredCategories.length === 0) {
         return new Response(JSON.stringify({ success: false, error: 'No valid categories provided' }), {
           status: 400,
           headers: { 'Content-Type': 'application/json' },
         });
       }

       const maxIdQuote = await PendingQuote.findOne().sort({ id: -1 }).lean();
       const newId = maxIdQuote ? maxIdQuote.id + 1 : 1;

       const newQuote = {
         id: newId,
         text: body.text,
         author: body.author,
         imageUrl: body.type === 'mini' ? body.imageUrl : null,
         categories: filteredCategories,
         type: body.type,
         status: 'pending',
       };

       const createdQuote = await PendingQuote.create(newQuote);

       return new Response(JSON.stringify({ success: true, quote: createdQuote }), {
         status: 200,
         headers: { 'Content-Type': 'application/json' },
       });
     } catch (err) {
       console.error('Error submitting quote:', err);
       return new Response(JSON.stringify({ success: false, error: err.message }), {
         status: 500,
         headers: { 'Content-Type': 'application/json' },
       });
     }
   }