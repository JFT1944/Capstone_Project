--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ingredients; Type: TABLE; Schema: public; Owner: justinprice
--

CREATE TABLE public.ingredients (
    id integer NOT NULL,
    name text NOT NULL,
    unit text NOT NULL,
    full_amount NUMERIC,
    available_amount NUMERIC,
    username character varying(25) NOT NULL
);


ALTER TABLE public.ingredients OWNER TO justinprice;

--
-- Name: ingredients_id_seq; Type: SEQUENCE; Schema: public; Owner: justinprice
--

CREATE SEQUENCE public.ingredients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ingredients_id_seq OWNER TO justinprice;

--
-- Name: ingredients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: justinprice
--

ALTER SEQUENCE public.ingredients_id_seq OWNED BY public.ingredients.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: justinprice
--

CREATE TABLE public.users (
    username character varying(25) NOT NULL,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    pref_unit text NOT NULL,
    CONSTRAINT users_email_check CHECK ((POSITION(('@'::text) IN (email)) > 1))
);


ALTER TABLE public.users OWNER TO justinprice;

--
-- Name: ingredients id; Type: DEFAULT; Schema: public; Owner: justinprice
--

ALTER TABLE ONLY public.ingredients ALTER COLUMN id SET DEFAULT nextval('public.ingredients_id_seq'::regclass);


--
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: justinprice
--

COPY public.ingredients (id, name, unit, full_amount, available_amount, username) FROM stdin;
1	garlic	oz	6	12	testuser-us
2	cumin	oz	3	12	testuser-us
3	cumin	oz	3	12	jp
4	cinnamin	oz	6	12	jp
5	Ham	oz	9	12	jp
6	turkey	lbs	100	10	jp
10	unk	oz	24	12	jp
11	Cinnamon	oz	1000	100	jp
12	Cucumber	plant	1	1	jp
13	steak	oz	16	8	jp1
14	jp	oz	12	6	jp
15	dry alcohol	cup	0	0	jp
16	semisweet chocolate	ounce	0	0	jp
17	coconut	ounce	0	-10	jp
18	Ground Chicken	pound	0	-2	jp
19	Olive Oil	tablespoon	0	-2	jp
21	Onion	other	0	-1	jp
22	crab	lbs	3	1	jp
23	Top Sirloin Filet	ounce	0	-16	jp
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: justinprice
--

COPY public.users (username, password, first_name, last_name, email, pref_unit) FROM stdin;
testuser-us	$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q	Test	User	joel@joelburton.com	U.S.
testuser-si	$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q	Test	Admin!	joel@joelburton.com	S.I.
jp	$2b$12$cgnYIZ1y90pBZFVRhclsHu6UeWptAxhjbOxM/q5kXc4P9pDicYgKO	Justin	Price	justin10price@gmail.com	SI
jp1	$2b$12$/5ma0gEi2JvpHB/0PjH5/O3xAl6FmwMN5.978LMCQYcuLeP7A8QPu	jp	jp	jp@gmail.com	SI
jp2	$2b$12$BZu/veHvQB6Rm7TFXx8D4.xpz9ItGtfJx8M74UHGQRU3H6eXQx6Va	jp	jp	jp@gmail.com	SI
jp3	$2b$12$NT.LI8G9H8rW5eDa34BxVOYsZypdDXeY9QCZXe1PVwillCBr/a17K	jp	jp	jp@gmail.com	SI
jp4	$2b$12$MJrtuiBzeZMjLBLBr4ozt.uujpUEUnQl01WE0AUsa.Xm/C.hoCMxK	jp	jp	jp@gmail.com	SI
jp6	$2b$12$nz5rKQ7OP4ws2W95ZUG.R.V.bTjvE/lr8CDyIpp29ALsHhy5Bkdn2	jp	jp	jp@gmail.com	SI
jp7	$2b$12$CdCbSYUQ4ewRQ2CSyPKpI.ZiWDZSxQELuEKohpiNQgxeK432ntEeq	jp	jp	jp@gmail.com	SI
jp10	$2b$12$fPsNIR73.kLfDXbAtN7MQuhUFa0TWHVvPbSOcEWRVu.Glzg2OgJMW	jp	jp	jp@gmail.com	US
jp11	$2b$12$CxevNxJk9ud7PXqYI2ZrT.6kZdrVXj/uoL2CdX0IcHLJ5gPejU.UG	jp	jp	jp@gmail.com	US
jp12	$2b$12$XPOhdGkHL4L734W04x3JNOX3nH3YIi/gLs5z.em6L0xXdVNEeO3xq	Justin	Price	justin10price@gmail.com	US
\.


--
-- Name: ingredients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: justinprice
--

SELECT pg_catalog.setval('public.ingredients_id_seq', 23, true);


--
-- Name: ingredients ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: justinprice
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: justinprice
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (username);


--
-- Name: ingredients ingredients_username_fkey; Type: FK CONSTRAINT; Schema: public; Owner: justinprice
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_username_fkey FOREIGN KEY (username) REFERENCES public.users(username) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

