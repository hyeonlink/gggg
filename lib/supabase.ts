
/**
 * [Supabase SQL Editor - 아래 쿼리를 실행하여 테이블을 생성하세요]
 * 
 * -- 1. 유저 역할 타입 생성
 * CREATE TYPE user_role AS ENUM ('CLUB', 'ANGEL', 'ADMIN');
 * 
 * -- 2. 프로필 테이블 (Auth 연동)
 * CREATE TABLE profiles (
 *   id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
 *   email TEXT UNIQUE NOT NULL,
 *   role user_role DEFAULT 'CLUB',
 *   created_at TIMESTAMPTZ DEFAULT NOW()
 * );
 * 
 * -- 3. 동아리 테이블
 * CREATE TABLE clubs (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   owner_id UUID REFERENCES profiles(id),
 *   name TEXT NOT NULL,
 *   university TEXT NOT NULL,
 *   category TEXT NOT NULL,
 *   description TEXT,
 *   long_description TEXT,
 *   logo_url TEXT,
 *   cover_url TEXT,
 *   location TEXT,
 *   member_count INT DEFAULT 1,
 *   tags TEXT[],
 *   angel_score INT DEFAULT 100,
 *   total_funding BIGINT DEFAULT 0,
 *   verification_status TEXT DEFAULT 'PENDING' CHECK (verification_status IN ('PENDING', 'VERIFIED', 'REJECTED')),
 *   created_at TIMESTAMPTZ DEFAULT NOW()
 * );
 * 
 * -- 4. 포스트 테이블
 * CREATE TABLE posts (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   club_id UUID REFERENCES clubs(id) ON DELETE CASCADE,
 *   content TEXT NOT NULL,
 *   image_url TEXT,
 *   likes INT DEFAULT 0,
 *   comments INT DEFAULT 0,
 *   type TEXT DEFAULT 'UPDATE',
 *   created_at TIMESTAMPTZ DEFAULT NOW()
 * );
 * 
 * -- 5. 후원자 테이블
 * CREATE TABLE sponsors (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   name TEXT NOT NULL,
 *   email TEXT,
 *   type TEXT CHECK (type IN ('INDIVIDUAL', 'CORPORATE')),
 *   description TEXT,
 *   interest_tags TEXT[],
 *   total_donated BIGINT DEFAULT 0,
 *   logo_url TEXT,
 *   is_partner BOOLEAN DEFAULT FALSE,
 *   created_at TIMESTAMPTZ DEFAULT NOW()
 * );
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (process.env as any).SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = (process.env as any).SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Tables = {
  clubs: any;
  posts: any;
  sponsors: any;
  profiles: any;
};
