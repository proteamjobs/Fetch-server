-- 비상용 데이터 입니다 --
use fetch_database;


INSERT INTO users
    (
    _id,
    email
    , google_id,facebook_id, password, name, provider, image, createdAt, updatedAt)
VALUES
    (3, 'test@gmail.com', NULL, NULL, '$2b$12$e1zz1IkKxW/.qn9IOAL7yOVWsGD/cCpwJkJwhekbywkzC8odnMmka', 'test1', 'fetcher', NULL, '2019-06-03 01:51:18', '2019-06-03 01:51:18'),
    (4, 'test2@gmail.com', NULL, NULL, '$2b$12$cQzg/EO4CIF2Odsb4/3vYebODoVRaG89lUWot/dbyDJeFU/BXwtu.', 'test2', 'fetcher', NULL, '2019-06-03 01:55:26', '2019-06-03 01:55:26'),
    (5, 'test3@gmail.com', NULL, NULL, '$2b$12$ttJk7a/QMDLIkv73jGhfa.5w25kay5tE0Brkco3CYA9SQs7MJkhOi', 'test3', 'fetcher', NULL, '2019-06-03 01:55:32', '2019-06-03 01:55:32'),
    (6, 'public.afant@gmail.com', NULL, NULL, '$2b$12$FaQLHvEUGwX6sn2HGK5EV.4EqGtHbuCJtUr/bMjwDGZYBpNxfI5qK', 'afant', 'fetcher', NULL, '2019-06-03 01:56:51', '2019-06-03 01:56:51'),
    (27, 'public1.afant@gmail.com', NULL, NULL, '$2b$12$xbNGySsCAN1BeblXdg0wm.U3bEeCznpxHuLaxIW6tV2kT.3sMok9m', 'afant', 'fetcher', NULL, '2019-06-03 09:33:01', '2019-06-03 09:33:01'),
    (30, 'public12.afant@gmail.com', NULL, NULL, '$2b$12$SWZy1kAaCKubf/YvjKO7QOGdajBDy6Fq0fudYxgWQnrcbdJkC1fRC', 'afant', 'fetcher', NULL, '2019-06-03 09:39:13', '2019-06-03 09:39:13'),
    (33, 'Test34@gmail.com', NULL, NULL, '$2b$12$fOUcT8HoUA9SYiHqwH1rFeIyr3cuuaxOyLYFrzUeXMogs9wjpnEI6', 'Test', 'fetcher', NULL, '2019-06-03 10:07:12', '2019-06-03 10:07:12'),
    (36, 'sksdid2@gmail.com', NULL, NULL, '$2b$12$sPJaji0SKnDjAawCC..VweOCuWuM8XK5dQAU69QsuZsnvEf.LU7J6', '허다영', 'fetcher', NULL, '2019-06-03 16:56:17', '2019-06-03 16:56:17');


INSERT INTO orders
    (
    _id,
    name
    , destination,destination_code, price, due, quantity, preferParcel, description, referenceUrl, buyer_id, status, parcel_id, createdAt, updatedAt)
VALUES
    (1, 'FILA 트레이닝 세트', '일본','jp', 80000, '2019-06-30', 1, 1, '일본 후쿠오카에서 판다고 하네요. 사다주세요', NULL, 3, 0, NULL, '2019-05-31 10:30:20', '2019-05-31 10:30:20'),
    (2, '아디다스 이지부스터', '미국',"us", 700000, '2019-06-15', 1, 1, '미국 LA에서 판다고 하네요. 사다주세요!!!!!!', NULL, 4, 0, NULL, '2019-05-31 10:32:18', '2019-05-31 10:32:18'),
    (3, '구찌 라이톤', '영국','uk', 1300000, '2019-07-04', 1, 1, '영국 런던에서 판다고 하네요. 사다주세요ㅎㅎㅎㅎㅎ', NULL, 5, 0, NULL, '2019-05-31 10:34:28', '2019-05-31 10:34:28'),
    (4, '구찌 벨트', '일본','jp', 60000, '2019-07-17', 1, 1, '일본 도쿄에서 판다고 하네요. 사다주세요ㅋ', NULL, 3, 0, NULL, '2019-05-31 10:58:31', '2019-05-31 10:58:31'),
    (5, '박세현의 티셔츠', '한국','kr', 10000000, '2019-07-20', 1, 1, '한국 제주도에서 판다고 하네요. 너무사고싶어요!!', NULL, 4, 0, NULL, '2019-05-31 10:59:45', '2019-05-31 10:59:45'),
    (6, '허다영의 양말', '프랑스','fr', 300000, '2019-08-29', 1, 1, '프랑스 파리에서 판다고 하네요. 한번 구해봐주세요', NULL, 5, 0, NULL, '2019-05-31 11:00:30', '2019-05-31 11:00:30'),
    (7, '정슬아의 안경', '독일','de', 60000000, '2019-08-30', 1, 1, '스위스에서 판다고 하네요. 구해주세요 제발요', NULL, 3, 0, NULL, '2019-05-31 11:01:09', '2019-05-31 11:01:09'),
    (8, '유요한의 셔츠', '체코','cz', 60000000, '2019-08-10', 1, 1, '체코에서 판다고 하네요. 급해요 !!!', NULL, 4, 0, NULL, '2019-05-31 11:01:40', '2019-05-31 11:01:40'),
    (9, '오레오오즈', '미국','us', 20000, '2019-06-14', 3, 1, '미국에서 파는 오레오오즈가 먹고싶어요 사다주세요!', NULL, 5, 0, NULL, '2019-06-01 08:47:51', '2019-06-01 08:47:51'),
    (10, '초코칩 쿠키', '베트남','vn', 13000, '2019-07-02', 10, 1, '베트남에서 파는 초코칩 쿠키가 그렇게 맛나다면서요? 꼭 먹어보고 싶어요 사다주세요 빨리요 현기증나요', NULL, 3, 0, NULL, '2019-06-01 08:56:42', '2019-06-01 08:56:42');



INSERT INTO productimgs
    (
    _id,
    order_id
    , imgUrl, createdAt, updatedAt)
VALUES
    (5, 1, 'http://server.fetcher.fun/image/fila.jpg', '2019-06-01 02:02:02', '2019-06-01 02:02:02'),
    (6, 2, 'http://server.fetcher.fun/image/adidas.jpg', '2019-06-01 02:02:11', '2019-06-01 02:02:11'),
    (7, 3, 'http://server.fetcher.fun/image/gucci.jpg', '2019-06-01 02:02:18', '2019-06-01 02:02:18'),
    (9, 4, 'http://server.fetcher.fun/image/gucci2.jpeg', '2019-06-01 02:02:53', '2019-06-01 02:02:53'),
    (10, 5, 'http://server.fetcher.fun/image/psh_t.jpg', '2019-06-01 02:03:01', '2019-06-01 02:03:01'),
    (11, 6, 'http://server.fetcher.fun/image/hdy_s.jpg', '2019-06-01 02:03:22', '2019-06-01 02:03:22'),
    (12, 7, 'http://server.fetcher.fun/image/jsa_g.jpg', '2019-06-01 02:03:34', '2019-06-01 02:03:34'),
    (13, 8, 'http://server.fetcher.fun/image/yyh_s.jpg', '2019-06-01 02:03:43', '2019-06-01 02:03:43'),
    (14, 1, 'http://server.fetcher.fun/image/fila.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
    (15, 2, 'http://server.fetcher.fun/image/adidas.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
    (16, 3, 'http://server.fetcher.fun/image/gucci.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
    (17, 4, 'http://server.fetcher.fun/image/gucci2.jpeg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
    (18, 5, 'http://server.fetcher.fun/image/psh_t.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
    (19, 6, 'http://server.fetcher.fun/image/hdy_s.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
    (20, 7, 'http://server.fetcher.fun/image/jsa_g.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
    (21, 8, 'http://server.fetcher.fun/image/yyh_s.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
    (22, 9, 'http://server.fetcher.fun/image/yyh_s.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
    (23, 10, 'http://server.fetcher.fun/image/jsa_g.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00');



