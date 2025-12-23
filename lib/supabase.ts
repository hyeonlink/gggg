
import { createClient } from '@supabase/supabase-js';

/**
 * DATABASE SCHEMA REFERENCE
 * 
 * profiles: id (uuid), email (text), role (text: 'CLUB'|'ANGEL'|'ADMIN'), created_at (timestamptz)
 * clubs: id (uuid), owner_id (uuid), name (text), university (text), category (text), 
 *        description (text), long_description (text), logo_url (text), cover_url (text),
 *        tags (text[]), angel_score (int), total_funding (bigint), verification_status (text: 'PENDING'|'VERIFIED')
 * posts: id (uuid), club_id (uuid), content (text), image_url (text), likes (int), created_at (timestamptz)
 * sponsors: id (uuid), name (text), email (text), type (text), interest_tags (text[]), total_donated (bigint)
 */

const supabaseUrl = 'https://ccrtzhqgagtnedlqqfpk.supabase.co';
const supabaseAnonKey = 'sb_publishable_P7m792finwnZqyujyUgTnw_HXAEVuoF';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
