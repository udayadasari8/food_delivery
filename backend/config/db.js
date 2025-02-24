const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // Load environment variables
 
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
 
module.exports = {
  supabase
};