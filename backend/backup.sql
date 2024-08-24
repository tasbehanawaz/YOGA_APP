-- MySQL dump 10.13  Distrib 9.0.1, for macos14.4 (x86_64)
--
-- Host: dragon.ukc.ac.uk    Database: tn277
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `cid` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  `contact` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('c001','TipTop','Paris',10.00,'Mr Smith'),('c002','Basic','Paris',12.00,'M.Parot'),('c003','Allied','London',8.00,'Ms Evans');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `CID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`CID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Sally Smith','New York','USA'),(2,'Lene Sayed','Manchester','UK'),(3,'Omar Zariz','Paris','France'),(4,'Fred Thompson','London','UK');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detailed_yoga_poses`
--

DROP TABLE IF EXISTS `detailed_yoga_poses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detailed_yoga_poses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `english_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sanskrit_name_adapted` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sanskrit_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `translation_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pose_description` text COLLATE utf8mb4_unicode_ci,
  `pose_benefits` text COLLATE utf8mb4_unicode_ci,
  `url_png` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `difficulty_level` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detailed_yoga_poses`
--

LOCK TABLES `detailed_yoga_poses` WRITE;
/*!40000 ALTER TABLE `detailed_yoga_poses` DISABLE KEYS */;
INSERT INTO `detailed_yoga_poses` VALUES (1,'Half Boat','Ardha Navasana','Ardha Nāvāsana','ardha = half, nāva = boat, āsana = posture','From a seated position the hands are gripped around the back of the legs and the knees are bent in a 90 degree angle.  Both legs are pulled in towards the abdomen.  The core is engaged to maintain balance on the sits bones (be sure that the back does not round).  The front of the torso lengthens between the pubis and top of the sternum as the spine extends in both directions reaching up to the sky and rooting down to the earth.  The gaze is forward and Bandhas are engaged.','Strengthens the abdomen, hip flexors and spine.  Stimulates the kidneys, thyroid, prostate glands and intestines.  Helps relieve stress.  Improves digestion.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483073/yoga-api/2_ozh7sv.png','Beginner','2024-07-29 19:23:56'),(2,'Butterfly','Baddha Konasana','Baddha Koṇāsana','baddha = bound, koṇa = angle, āsana = posture','In sitting position, bend both knees and drop the knees to each side, opening the hips.  Bring the soles of the feet together and bring the heels as close to the groin as possible, keeping the knees close to the ground.  The hands may reach down and grasp and maneuver the feet so that the soles are facing upwards and the heels and little toes are connected.  The shoulders should be pulled back and no rounding of the spine.','Opens the hips and groins.  Stretches the shoulders, rib cage and back.  Stimulates the abdominal organs, lungs and heart.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483074/yoga-api/5_i64gif.png','Beginner','2024-07-29 19:23:56'),(3,'Cat','Marjaryasana','Marjaryāsana','marjarya = cat, āsana = posture','From box neutral shift some weight to the palms.  The wrists, elbows and shoulders are in one line.  The abdomen is pulled in and up with the spine arched in a strong Cobra spine.  The crown of the head is towards the earth and the neck is relaxed.  The gaze is between the arms towards the belly.','Relieves the spine and neck. Energizes the body.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483075/yoga-api/7_a6aspg.png','Beginner','2024-07-29 19:23:56'),(4,'Cow','Bitilasana','Bitilāsana','bitil = cow, āsana = posture','From  box neutral the ribcage is lifted with a gentle sway in the low back.  The tailbone lifts up into dog tilt.  The eyes are soft and the gaze is to the sky.','Removes fatigue.  Improves breathing and the circulation of blood to the brain.  Rejuvenates the entire body.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483077/yoga-api/8_wi10sn.png','Beginner','2024-07-29 19:23:56'),(5,'Chair','Utkatasana','Utkaṭāsana','utkaṭa = fierce, āsana = posture','From a standing position, the feet are together and rooted into the earth with toes actively lifted.  The knees are bent and the weight of the body is on the heels of the feet.  The pelvis is tucked in and the ribcage is lifted.  The neck is a natural extension of the spine.  The arms are lifted up toward the sky with the elbows straight and the biceps by the ears.  The hands can be together or separated and facing each other with the fingers spread wide.  The gaze is forward.','Strengthens the ankles, thighs, calves, and spine.  Stretches shoulders and chest.  Stimulates the abdominal organs, diaphragm, and heart.  Reduces flat feet.  Energizes the entire body.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483078/yoga-api/9_ewvoun.png','Beginner','2024-07-29 19:23:56'),(6,'Child\'s Pose','Balasana','Balāsana','bala = child, āsana = posture','From a kneeling position, the toes and knees are together with most of the weight of the body resting on the heels of the feet.  The arms are extended back resting alongside the legs.  The forehead rests softly onto the earth.  The gaze is down and inward.','Gently stretches the hips, thighs, and ankles.  Calms the brain and helps relieve stress and fatigue.  Relieves back and neck pain when done with head and torso supported.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483079/yoga-api/10_wzpo85.png','Beginner','2024-07-29 19:23:56'),(7,'Corpse','Sivasana','Śavāsana','śava = corpse, āsana = posture','The body rests on the earth in a supine position with the arms resting by the side body.  The palms are relaxed and open toward the sky.  The shoulder blades are pulled back, down and rolled under comfortably, resting evenly on the earth.  The legs are extended down and splayed open.  The heels are in and the toes flop out.  The eyes are closed.  Everything is relaxed.  The gaze is inward.','Calms the brain and helps relieve stress and mild depression.  Relaxes the body.  Reduces headache, fatigue, and insomnia.  Helps to lower blood pressure.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483078/yoga-api/11_dczyrp.png','Beginner','2024-07-29 19:23:56'),(8,'Low Lunge','Anjaneyasana','Aṅjaneyāsana','aṅjaneya = praise, āsana = posture','The front knee is bent in a 90-degree angle directly above the ankle and the back knee is resting on the earth with the top of the back foot pressed firmly into the earth.  The hips are squared and pressed forward.  The inner thighs scissor towards each other.  The pelvis is tucked under to protect the low back.  The ribcage is lifted.  The arms are lifted.  The hands can be together or separated and facing each other with the fingers spread wide.  The gaze is forward.','Stretches the chest, lungs, neck, belly and groin (psoas).  Strengthens the shoulders, arms and back muscles.  Strengthens and stretches the thighs, calves and ankles.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483086/yoga-api/23_k2jccj.png','Beginner','2024-07-29 19:23:56'),(9,'Seated Forward Bend','Paschimottanasana','Paśchimottānāsana','paśchima = back, uttāna = stretch out, āsana = posture','From a seated position with the sits bones rooted into the earth the legs extend forward to the degree that the chest and thighs can stay connected.  The fingers wrap around the toes.  The upper torso folds forward at the crease of the hips with the spine long.  The gaze is forward.','Calms the brain and helps relieve stress and mild depression.  Stretches the spine, shoulders and hamstrings.  Stimulates the liver, kidneys, ovaries and uterus.  Improves digestion.  Helps relieve the symptoms of menopause and menstrual discomfort.  Soothes headache and anxiety.  Reduces fatigue.  Therapeutic for high blood pressure, infertility, insomnia and sinusitis.  Traditional texts say that Paschimottanasana increases appetite, reduces obesity and cures diseases.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483091/yoga-api/30_gumpl3.png','Beginner','2024-07-29 19:23:56'),(10,'Sphinx','Salamba Bhujangasana','Sālamba Bhujaṅgāsana','sālamba = supported, bhujaṅga = serpent, āsana = posture','From a prone position with the pelvic bowl is firmly contracted interiorly towards the center line of the body while the pubis is tucked under.  The legs are extended back and the tops of the feet are flat.  The palms are flat and the elbows are on the mat, stacked right below the shoulders.  On an inhalation, lift the sternum and extend the neck away from shoulders with the elbows, palms and pelvic bone firmly attached to the mat.','Strengthens the spine.  Stretches the chest, the lungs, the shoulders and the abdomen.  Stimulates the abdominal organs.  Opens the heart and the lungs.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483092/yoga-api/35_dytwvz.png','Beginner','2024-07-29 19:23:56'),(11,'Garland Pose','Malasana','Mālāsana','mālā = garland or necklace, āsana = posture','From a squatting position the feet are as close together as possible (keep your heels on the floor if you can; otherwise, support them on a folded mat).  The thighs are slightly wider than the torso.  The torso is leaning gently forward and tucked snugly between the thighs.  The elbows are pressed against the inner knees and the palms are together in Anjali Mudra (Salutation Seal).  The knees resist the elbows to help lengthen the front torso.  The gaze is soft and forward.','Stretches the ankles, groins and back torso.  Tones the belly.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483093/yoga-api/37_moh7ii.png','Beginner','2024-07-29 19:23:56'),(12,'Standing Forward Bend','Uttanasana','Uttānāsana','uttāna = stretch out, āsana = posture','From a standing position, the body is folded over at the crease of the hip with the spine long.  The neck is relaxed and the crown of the head is towards the earth.  The feet are rooted into the earth with the toes actively lifted.  The spine is straight.  The ribcage is lifted.  The chest and the thighs are connected.  The sacrum lifts up toward the sky in dog tilt.  The fingertips are resting on the earth next to the toes.  The gaze is down or slightly forward.','Calms the brain and helps relieve stress and mild depression.  Stimulates the liver and kidneys.  Stretches the hamstrings, calves, and hips.  Strengthens the thighs and knees.  Improves digestion.  Helps relieve the symptoms of menopause.  Reduces fatigue and anxiety.  Relieves headache and insomnia.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483093/yoga-api/38_yb3thk.png','Beginner','2024-07-29 19:23:56'),(13,'Triangle','Trikonasana','Trikoṇāsana','trikoṇa = triangle, āsana = posture','From a standing position, the legs are straight and separated into a wide stance.  The feet are aligned and flat on the earth with the back foot in a 60-degree angle towards the front.  The inner thighs are rotated externally away from each other.  The pelvis is tucked and the ribcage is lifted.  One arm extends up towards the sky as the other reaches down to the earth.  Both arms are aligned with the shoulders in a straight line.  The fingers reach out as the shoulder blades squeeze together.  The gaze is toward the front.','Stretches and strengthens the thighs, knees, and ankles.  Stretches the hips, groin, hamstrings, calves, shoulders, chest, and spine.  Stimulates the abdominal organs.  Helps relieve stress.  Improves digestion.  Helps relieve the symptoms of menopause.  Relieves backache, especially through second trimester of pregnancy.  Therapeutic for anxiety, flat feet, infertility, neck pain, osteoporosis, and sciatica.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483096/yoga-api/42_jawxqw.png','Beginner','2024-07-29 19:23:56'),(14,'Warrior One','Virabhadrasana One','Vīrabhadrāsana I','vīrabhadra = warrior, āsana = posture','From a standing position, the legs are in a wide stance with the feet aligned and flat on the earth.  The back foot is in a 60-degree angle towards the front.  The hips are squared.  The inner thighs are rotated towards each other.  The front knee is bent in a 90-degree angle directly above the ankle.  The arms extend up to the sky with the biceps by the ears.  The hands can be together or separated and facing each other with the fingers spread wide.  The ribcage is lifted and the pelvis tucked.  The gaze is forward.','Stretches the chest, lungs, shoulders, neck, belly and groin (psoas).  Strengthens the shoulders, arms and back muscles.  Strengthens and stretches the thighs, calves and ankles.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483096/yoga-api/44_dqeayo.png','Beginner','2024-07-29 19:23:56'),(15,'Warrior Two','Virabhadrasana Two','Vīrabhadrāsana II','vīrabhadra = warrior, āsana = posture','From a standing position, the legs are separated into a wide stance.  The front knee is bent in a 90-degree angle directly above the ankle.  The back leg is extended and straight with the outside edge of the back foot gripping the earth in a 60-degree angle towards the front.  The inner thighs are externally rotated away from each other.  The pelvis is tucked.  The ribcage is lifted.  The arms are extended out to the sides and are aligned with the shoulders in a straight line with the fingers reaching out as the shoulder blades squeeze together.  The gaze is toward the front fingers.','Strengthens and stretches the legs and ankles.  Stretches the groin, chest, lungs, and shoulders.  Stimulates abdominal organs.  Increases stamina.  Relieves backaches, especially through second trimester of pregnancy.  Therapeutic for carpal tunnel syndrome, flat feet, infertility, osteoporosis, and sciatica.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483096/yoga-api/45_ehimr1.png','Beginner','2024-07-29 19:23:56'),(16,'Boat','Navasana','Nāvāsana','nāva = boat, āsana = posture','From a seated position the feet are lifted up so that the thighs are angled about 45-50 degrees relative to the earth.  The tailbone is lengthened into the earth and the pubis pulls toward the navel.  The shoulder blades are spread across the back and the hands reach around the back of the calves, with legs pulled towards the body.  The chin is tipped slightly toward the sternum so that the base of the skull lifts lightly away from the back of the neck.  Gaze is forward.','Strengthens the abdomen, hip flexors, and spine.  Stimulates the kidneys, thyroid and prostate glands, and intestines.  Helps relieve stress.  Improves digestion.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483071/yoga-api/1_txmirf.png','Intermediate','2024-07-29 19:23:58'),(17,'Bow','Dhanurasana','Dhanurāsana','dhanur = bow, āsana = posture','From a prone position with the abdomen on the earth, the hands grip the ankles (but not the tops of the feet) with knees no wider than the width of your hips.  The heels are lifted away from the buttocks and at the same time the thighs are lifted away from the earth working opposing forces as the heart center, hips and back open.  The gaze is forward.','Stretches the entire front of the body, ankles, thighs and groins, abdomen and chest, and throat, and deep hip flexors (psoas).  Strengthens the back muscles.  Improves posture.  Stimulates the organs of the abdomen and neck.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483072/yoga-api/3_aa0fgk.png','Intermediate','2024-07-29 19:23:58'),(18,'Camel','Ustrasana','Uṣṭrāsana','uṣṭra = camel, āsana = posture','From a kneeling position the knees are hip width apart and the thighs are perpendicular to the earth.  The inner thighs are narrowed and rotated slightly inward with the buttocks engaged but not hardened.  The tailbone is tucked under but the hips do not puff forward.  The shins and tops of the feet are pressed firmly into the earth.  The ribcage is open, along with the heart center, but the lower front ribs do not protrude sharply towards the sky.  The lower back lifts the ribs away from the pelvis to keep the lower spine as long as possible.  The base of the palms are pressed firmly against the soles (or heels) of the feet and the fingers are pointed toward the toes.  The arms are extended straight and are turned slightly outward at the shoulder joint so the elbow creases face forward without squeezing the shoulder blades together.  The neck is in a relatively neutral position, neither flexed nor extended, or (for the advanced practitioners only) the head drops back.  Be careful not to strain your neck and harden your throat.  The gaze is either towards the sky or towards the earth, depending upon your flexibility.','Stretches the entire front of the body, the ankles, thighs and groins, abdomen and chest, and throat.  Stretches the deep hip flexors (psoas).  Strengthens back muscles.  Improves posture.  Stimulates the organs of the abdomen and neck.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483075/yoga-api/6_ri1w0e.png','Intermediate','2024-07-29 19:23:58'),(19,'Crescent Lunge','Alanasana','Ashta Chandrāsana','ashta = side, chandra = moon, āsana = posture','From mountain pose, on the inhalation bring the hands up and interlace the fingers together. Exhale, bend to one side, lengthening the opposite of the rib cage and stretch.','Stretches the rib cage, arms and torso.  Tones the oblique muscles.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483080/yoga-api/12_pv4p1z.png','Intermediate','2024-07-29 19:23:58'),(20,'Crow','Bakasana','Bakāsana','baka = crane, āsana = posture','From an inverted position, with the hips up and the head down, the arms are bent in a 90-degree angle with the knees resting on the elbows.  The palms are firmly rooted into the earth with knuckles pressed firmly into the earth for support.  The belly is pulled up and in towards the spine with the ribcage and chin lifted.  The weight of the body shifts slightly forward as the toes lift up and off the earth into the full expression of the pose.  The gaze is down and slightly forward.','Strengthens arms and wrists.  Stretches the upper back.  Strengthens the abdominal muscles.  Opens the groin.  Tones the abdominal organs.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483083/yoga-api/13_hdjxuz.png','Intermediate','2024-07-29 19:23:58'),(21,'Downward-Facing Dog','Adho Mukha Svanasana','Parivṛtta Adho Mukha Śvānāsana','parivṛtta = revolved, adho = downward, mukha = facing, śvāna = dog, āsana = posture','From downward_dog.html the legs are straight with the sits bones tilted up and reaching for the sky.  The feet are flat with the heels firmly rooted.  One palm is flat with the knuckles evenly pressed into the earth.  The other hand reaches under the body and grasps the opposite ankle.  The spine is long and the heart is open toward the sky.  The neck is loose and the crown of the head is relaxed toward the earth.  The gaze is toward the center.','Calms the brain and helps relieve stress and mild depression.  Energizes the body.  Stretches the shoulders, neck, hamstrings, calves, arches, and hands.  Strengthens the arms and legs.  Helps relieve the symptoms of menopause.  Relieves menstrual discomfort when done with the head supported.  Helps prevent osteoporosis.  Improves digestion.  Relieves headache, insomnia, back pain, and fatigue.  Therapeutic for high blood pressure, asthma, flat feet, sciatica, and sinusitis.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483081/yoga-api/15_vkviqn.png','Intermediate','2024-07-29 19:23:58'),(22,'Eagle','Garudasana','Garuḍāsana','garuḍa = eagle, āsana = posture','From a standing position the one thigh is crossed over the other with the toes and/or the ankle hooked behind the lower calf.  The weight of the body is balanced on the standing foot.  The arms are crossed in front of the torso so that one arm is crossed above the other arm.  The top arm is tucked into the elbow crook of the bottom arm.  The hands are hooked around each other as well.  Once hooked, the elbows lift up and the fingers stretch towards the ceiling.  The gaze is soft and forward.','Strengthens and stretches the ankles and calves.  Stretches the thighs, hips, shoulders, and upper back.  Improves concentration.  Improves sense of balance.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483081/yoga-api/16_g7ueht.png','Intermediate','2024-07-29 19:23:58'),(23,'Extended Side Angle','Utthita Parsvakonasana','Utthita Pārśvakoṇāsana','utthita = extended, pārśva = side, koṇa = angle, āsana = posture','From warrior II the lower body stays static while the upper body is folded forward at the crease of the hip.  One arm is extended toward the front with the bicep by the ear and the fingers spread wide while the other reaches down to the earth on the inside of the thigh.  The upper torso and the gaze twist up towards the sky.','Strengthens and stretches the legs, knees, and ankles.  Stretches the groin, spine, waist, chest, lungs, and shoulders. Stimulates abdominal organs. Increases stamina.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483083/yoga-api/18_aqufak.png','Intermediate','2024-07-29 19:23:58'),(24,'Forward Bend with Shoulder Opener','Uttanasana','Uttānāsana','uttāna = stretch out, āsana = posture','From a standing position, the body is folded over at the crease of the hip with the spine long.  The neck is relaxed and the crown of the head is towards the earth.  The feet are rooted into the earth.  The toes are actively lifted.  The spine is straight.  The ribcage is lifted.  The chest and the thighs are connected.  The sacrum lifts up toward the sky in dog tilt.  The fingers are interlaced behind the body and the palms are together.  The arms and elbows are straight.  The shoulder blades rotate towards each other as the hands move forward (away from the lower back).  The gaze is down and inward.','Calms the brain and helps relieve stress and mild depression.  Stimulates the liver and kidneys.  Stretches the hamstrings, calves, and hips.  Strengthens the thighs and knees.  Improves digestion.  Helps relieve the symptoms of menopause.  Reduces fatigue and anxiety.  Relieves headache and insomnia.  Relieves headache and insomnia.  Opens the shoulders.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483085/yoga-api/20_uogrfq.png','Intermediate','2024-07-29 19:23:58'),(25,'Half-Moon','Ardha Chandrasana','Ardha Chandrāsana','ardha = half, chandra = moon,āsana = posture','From a standing position one leg is straight while the other is extended back parallel to the earth (or a little above parallel) and one hand is on the earth (beyond the little-toe side of the foot, about 12 inches) while the other hand is extended up towards the sky.  The shoulder blades are squeezed together and the fingers move outward in opposing directions.  The weight of the body is supported mostly by the standing leg while the bottom hand has very little weight on it but is used intelligently to regulate balance.  The upper torso is rotated open to the sky.  Both hips are externally rotated.  Energy is extended actively through the flexed toes to keep the raised leg strong.  The inner ankle of the standing foot is lifted strongly upward, as if drawing energy from the earth.  The sacrum and scapulae are firmly pressed against the back torso and lengthen the coccyx toward the raised foot.  The gaze is either up or down, depending on the condition of the neck.  If injured the gaze is down.','Strengthens the abdomen, ankles, thighs, buttocks and spine.  Stretches the groins, hamstrings, calves, shoulders, chest and spine.  Improves coordination and sense of balance.  Helps relieve stress.  Improves digestion.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483085/yoga-api/21_etedlp.png','Intermediate','2024-07-29 19:23:58'),(26,'Pigeon','Supta Kapotasana','Supta Kapotāsana','supta = supine, kapota = pigeon, āsana = posture','Lie on the back in supine position.  Bend the knees, heels close to SI bones and cross one ankle over the opposite knee.  Thread the hands or reach through between the thighs.  Lift the foot off the floor and hold the bent knee behind the thigh or shin to bring it closer to the chest, make sure that the acrum is rooted to the floor.','Stretches the hamstrings and quads.  If the elbow is used to push the thigh, it opens the hips as well.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483088/yoga-api/24_ulgsjo.png','Intermediate','2024-07-29 19:23:58'),(27,'King Pigeon','Eka Pada Rajakapotasana','Eka Pāda Rājakapotāsana','eka = one, pāda = foot or leg, rāja = king, kapota = pigeon, āsana = posture','From a seated position with the hips squared, one leg is extended forward with the knee bent and parallel to the earth.  The front heel is rooted close to the groin (or extended out in a 90 degree angle if flexibility allows).  The other leg is extended back with the knee bent and perpendicular to the earth.  The back foot is hooked on the inside of the elbow of the back arm.  The front elbow is bent upward perpendicular to the earth with the bicep by the ear.  The fingers are interlaced to connect the bind behind the body and assist in opening the chest.  The gaze is natural and forward.','Stretches the thighs, groins (psoas), abdomen, chest, shoulders and neck.  Stimulates the abdominal organs.  Opens the shoulders and chest.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483087/yoga-api/25_rssro9.png','Intermediate','2024-07-29 19:23:58'),(28,'Plank','Phalakasana','Phalakāsana','phalaka = plank, āsana = posture','The body is parallel to the earth.  The weight of the body is supported by straight arms and active toes.  The abdomen is pulled up towards the spine and the pelvis is tucked in.  The neck is a natural extension of the spine and the chin is slightly tucked.  The palms are flat and the elbows are close to the side body.  The joints are stacked with the wrists, elbows and shoulders in a straight line perpendicular to the earth.  The gaze follows the spine and the eyes are focused down.','Strengthens the arms, wrists, and spine.  Tones the abdomen.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483088/yoga-api/26_mxkzlo.png','Intermediate','2024-07-29 19:23:58'),(29,'Plow','Halasana','Halāsana','hala = plow, āsana = posture','From a supine position, the upper back rests on the earth with the hips and legs revolved back over the torso above and beyond the head towards the earth.  The torso is perpendicular to the earth.  The legs are fully extended with no bend at the knees as the toes reach for the earth.  The hands are either supporting the lower back or extended behind the back on the earth with extended elbows and fingers interlaced (as flexibility allows), opening the shoulders.  The neck is straight.  The chin tucked.  Do not look to the side as this may injure the neck.  The is gaze inward.','Calms the brain.  Stimulates the abdominal organs and the thyroid glands.  Stretches the shoulders and spine.  Helps relieve the symptoms of menopause.  Reduces stress and fatigue.  Therapeutic for backache, headache, infertility, insomnia,  and sinusitis.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483088/yoga-api/27_m4yux9.png','Intermediate','2024-07-29 19:23:58'),(30,'Pyramid','Parsvottanasana','Pārśvottānāsana','pārśva = side, uttāna = stretch out, āsana = posture','From a standing position with one leg forward and one back lean the torso forward at the crease of the hip joint.  Stop when the torso is parallel to the floor.  Press the fingertips or flat palms to the floor on either side of the front foot, maintaining a straight elongated spine.  If it isn’t possible to touch the floor, or to maintain a straight spine, support the hands on a pair of blocks.  Press the thighs back and lengthen the torso forward, lifting up through the top of the sternum.  Then, as flexibility allows, bring the front torso closer to the top of the thigh without rounding the spine.  Eventually the long front torso will rest down on the thigh.  The gaze is down.','Calms the brain.  Stretches the spine, the shoulders, the hips and the hamstrings.  Strengthens the legs.  Stimulates the abdominal organs.  Improves posture and sense of balance.  Improves digestion.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483089/yoga-api/28_uu58tt.png','Intermediate','2024-07-29 19:23:58'),(31,'Reverse Warrior','Parsva Virabhadrasana','Pārśva Vīrabhadrāsana','pārśva = side, vīrabhadra = warrior, āsana = posture','From warrior II , the lower body stays static while the upper body arches back in a gentle back bend.  The top arm is extended back with the bicep by the ear and the fingers spread wide.  The other arm slides down the back leg resting on the thigh or shin, but not the knee joint.  The gaze is up towards the sky.','Strengthens and stretches the legs, knees, and ankles.  Stretches the groin, spine, waist, chest, lungs, and shoulders.  Stimulates abdominal organs.  Increases stamina.  Relieves backaches, especially through second trimester of pregnancy.  Therapeutic for carpal tunnel syndrome, flat feet, infertility, osteoporosis, and sciatica.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483089/yoga-api/29_ww7bot.png','Intermediate','2024-07-29 19:23:58'),(32,'Lotus','Padmasana','Padmāsana','padma = lotus, āsana = posture','Bring the bottom ankle and place it on top of the opposite knee, both ankles will be resting on top of the thighs.','Opens the hips, groin and stretches the knees, ankles and thighs.  Strengthens the back and calms the mind, reduces stress and anxiety.  Improves circulation and blood flow in the pelvis.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483091/yoga-api/31_ozseum.png','Intermediate','2024-07-29 19:23:58'),(33,'Shoulder Stand','Salamba Sarvangasana','Sālamba Sarvāṅgāsana','sa = with, ālamba = support, sarvāṅga = all limb, āsana = posture','From a supine position, the upper back is resting on the earth with the hips straight up towards the sky.  The torso is perpendicular to the earth.  The legs are fully extended and the toes are active.  The hands are either supporting the lower back or extended up by the side body in matchstick.  The neck is flat on the earth and the chin is tucked in.  The gaze is inward.','Calms the brain and helps relieve stress and mild depression.  Stimulates the thyroid and prostate glands and abdominal organs.  Stretches the shoulders and neck.  Tones the legs and buttocks.  Improves digestion.  Helps relieve the symptoms of menopause.  Reduces fatigue and alleviates insomnia.  Therapeutic for asthma, infertility, and sinusitis.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483091/yoga-api/33_r7motl.png','Intermediate','2024-07-29 19:23:58'),(34,'Side Plank','Vasisthasana','Vasiṣṭhāsana','vasiṣṭha = name of a sage, āsana = posture','From an arm balance position the weight of the body is supported on one side and distributed equally between the bottom arm and foot while the other (top) arm lifts with fingers spread wide and the other (top) foot stacks on top.  The grounded (bottom) foot is flat and gripping the earth from the outside edge of the foot.  If flexibility of the foot is limited then instead of gripping the earth with a flat foot, the weight of the body is balanced on the side edge of the foot that is flexed instead of flat.  The arm supporting the weight of the body and the grounded foot actively press into the floor as the shoulder blades firm against the back and then widen away from the spine drawing toward the tailbone.  Bandhas are engaged to maintain balance and stability.  The crown of the head reaches away from the neck and the gaze is up towards the hand.','Calms the brain and helps relieve stress and mild depression.  Stretches the shoulders, hamstrings, calves, and arches.  Strengthens the arms and legs.  Helps relieve the symptoms of menopause.  Helps prevent osteoporosis.  Improves digestion.  Relieves headache, insomnia, back pain, and fatigue.  Therapeutic for high blood pressure, asthma, flat feet, sciatica.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483093/yoga-api/34_qle5tp.png','Intermediate','2024-07-29 19:23:58'),(35,'Crescent Moon','Ashta Chandrasana','Ashta Chandrāsana','ashta = side, chandra = moon, āsana = posture','From mountain pose, on the inhalation bring the hands up and interlace the fingers together.  Exhale, bend to one side, lengthening the opposite of the rib cage and stretch.','Stretches the rib cage, arms and torso.  Tones the oblique muscles.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483095/yoga-api/39_hqj0sa.png','Intermediate','2024-07-29 19:23:58'),(36,'Tree','Vrksasana','Vṛkṣāsana','vṛkṣa = tree, āsana = posture','From a standing position, one foot is rooted into the earth with the opposite heel rooted into the inner thigh with the toes pointing towards the earth.  The pelvis and the chin are tucked in.  The arms are lifted above the head with the palms together in prayer position.  The gaze is forward.','Strengthens the legs, ankles, and feet.  Improves flexibility in the hips and knees.  Improves balance.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483094/yoga-api/41_veknug.png','Intermediate','2024-07-29 19:23:58'),(37,'Upward-Facing Dog','Urdhva Mukha Svsnssana','Ūrdhva Mukha Śvānāsana','ūrdhva = upward, mukha = facing, śvāna = dog, āsana = posture','The body is in a prone position parallel to the earth.  The weight of the body is supported equally by the straight arms and the tops of the feet which press firmly into the earth.  The shoulders are rotated back and down.  The ribcage is lifted and pulled thru to the front in a slight upper thoracic backbend.  The joints are stacked with the wrists, elbows and shoulders in a straight-line.  The neck is a natural extension of the spine and the chin is slightly tucked.  The abdomen is pulled up towards the spine.  The palms are flat and the elbows are close to the side body.  The gaze is forward.','Improves posture.  Strengthens the spine, arms, and wrists.  Stretches the chest, lungs, shoulders, and abdomen.  Firms the buttocks.  Stimulates abdominal organs.  Helps relieve mild depression, fatigue, and sciatica.  Therapeutic for asthma.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483096/yoga-api/43_m3nxjk.png','Intermediate','2024-07-29 19:23:58'),(38,'Wild Thing','Camatkarasana','Camatkārāsana','camatkāra = struck with wonder, āsana = posture','From downward dog pose, elevate one leg toward the sky and stack the corresponding hip over the other hip.  Bring the upper heel as close to the buttocks as possible.  The hips remain stacked; then bring the shoulders forward slowly over the hands.  Replace the corresponding hand to the upraised leg with the other hand and flip yourself over and extend the top hand forward.  The bottom foot is now facing toward the front of the mat and you remain on the ball of the top foot and the corresponding knee is bent.  Continue to lift hips up towards the sky and continue reaching the free hand towards the front of the room and slightly downwards.  Allow the head to curl back.','Stretches the chest, shoulders, back, and throat.  Strengthens and opens the hips, hip flexors, and thighs.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483097/yoga-api/48_unoav6.png','Intermediate','2024-07-29 19:23:58');
/*!40000 ALTER TABLE `detailed_yoga_poses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `EID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`EID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Sara Targon','salesperson'),(2,'Michael Ufah','salesperson'),(3,'Muhammad Ariz','salesperson');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manages`
--

DROP TABLE IF EXISTS `manages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manages` (
  `EID` int NOT NULL,
  `RID` int NOT NULL,
  PRIMARY KEY (`EID`,`RID`),
  KEY `RID` (`RID`),
  CONSTRAINT `manages_ibfk_1` FOREIGN KEY (`EID`) REFERENCES `employees` (`EID`),
  CONSTRAINT `manages_ibfk_2` FOREIGN KEY (`RID`) REFERENCES `regions` (`RID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manages`
--

LOCK TABLES `manages` WRITE;
/*!40000 ALTER TABLE `manages` DISABLE KEYS */;
INSERT INTO `manages` VALUES (1,1),(1,2),(2,3),(3,4);
/*!40000 ALTER TABLE `manages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordering`
--

DROP TABLE IF EXISTS `ordering`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordering` (
  `ordno` int DEFAULT NULL,
  `month` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `cid` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pid` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordering`
--

LOCK TABLES `ordering` WRITE;
/*!40000 ALTER TABLE `ordering` DISABLE KEYS */;
INSERT INTO `ordering` VALUES (1011,'Jan',1000,'c001','p01'),(1012,'Feb',1000,'c002','p03'),(1013,'Jun',1000,'c003','p03');
/*!40000 ALTER TABLE `ordering` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `OrderNo` int NOT NULL AUTO_INCREMENT,
  `CID` int DEFAULT NULL,
  `PID` int DEFAULT NULL,
  `RID` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`OrderNo`),
  KEY `CID` (`CID`),
  KEY `PID` (`PID`),
  KEY `RID` (`RID`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`CID`) REFERENCES `customers` (`CID`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`PID`) REFERENCES `products` (`PID`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`RID`) REFERENCES `regions` (`RID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,1,1,1),(2,2,1,2,25),(3,4,1,2,17),(4,3,4,3,500),(5,3,2,4,117),(6,3,3,3,5),(7,2,1,1,1),(8,2,2,1,1),(9,1,1,3,1),(10,1,2,3,1),(11,1,3,3,1),(12,1,4,3,1);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pose_sequence`
--

DROP TABLE IF EXISTS `pose_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pose_sequence` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` int NOT NULL,
  `position` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pose_sequence`
--

LOCK TABLES `pose_sequence` WRITE;
/*!40000 ALTER TABLE `pose_sequence` DISABLE KEYS */;
INSERT INTO `pose_sequence` VALUES (1,'Boat',5,1,'2024-08-04 15:10:51'),(2,'Bow',5,2,'2024-08-04 15:10:51'),(3,'Bridge',5,3,'2024-08-04 15:10:51'),(4,'Butterfly',5,4,'2024-08-04 15:10:51'),(5,'Camel',5,5,'2024-08-04 15:10:51'),(6,'Cat',5,6,'2024-08-04 15:10:51'),(7,'Corpse',5,7,'2024-08-04 15:10:51'),(8,'Boat',5,1,'2024-08-05 17:11:34'),(9,'Bow',5,2,'2024-08-05 17:11:34'),(10,'Bridge',5,3,'2024-08-05 17:11:34'),(11,'Butterfly',5,4,'2024-08-05 17:11:34'),(12,'Camel',5,5,'2024-08-05 17:11:34'),(13,'Cat',5,6,'2024-08-05 17:11:34'),(14,'Corpse',5,7,'2024-08-05 17:11:34'),(15,'Boat',10,1,'2024-08-06 11:05:55'),(16,'Bow',5,2,'2024-08-06 11:05:55'),(17,'Bridge',5,3,'2024-08-06 11:05:55'),(18,'Butterfly',5,4,'2024-08-06 11:05:55'),(19,'Camel',5,5,'2024-08-06 11:05:55'),(20,'Cat',5,6,'2024-08-06 11:05:55'),(21,'Corpse',5,7,'2024-08-06 11:05:55'),(22,'Boat',2,1,'2024-08-06 11:10:53'),(23,'Bow',10,2,'2024-08-06 11:10:53'),(24,'Bridge',5,3,'2024-08-06 11:10:53'),(25,'Butterfly',5,4,'2024-08-06 11:10:53'),(26,'Camel',5,5,'2024-08-06 11:10:53'),(27,'Cat',5,6,'2024-08-06 11:10:53'),(28,'Corpse',5,7,'2024-08-06 11:10:53');
/*!40000 ALTER TABLE `pose_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pose_sequences`
--

DROP TABLE IF EXISTS `pose_sequences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pose_sequences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sequence_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pose_data` json NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pose_sequences`
--

LOCK TABLES `pose_sequences` WRITE;
/*!40000 ALTER TABLE `pose_sequences` DISABLE KEYS */;
INSERT INTO `pose_sequences` VALUES (1,'Sequence 1','[{\"name\": \"Pigeon\", \"duration\": 8, \"position\": \"28\"}, {\"name\": \"Warrior Three\", \"duration\": 10, \"position\": \"44\"}, {\"name\": \"Upward-Facing Dog\", \"duration\": 5, \"position\": \"42\"}]','2024-08-04 16:51:10'),(2,'Sequence 2','[{\"name\": \"Wild Thing\", \"duration\": 6, \"position\": \"47\"}, {\"name\": \"Seated Forward Bend\", \"duration\": 5, \"position\": \"33\"}, {\"name\": \"Boat\", \"duration\": 10, \"position\": \"1\"}]','2024-08-04 16:51:10'),(3,'Sequence 3','[{\"name\": \"Forearm Stand\", \"duration\": 5, \"position\": \"18\"}, {\"name\": \"Sphinx\", \"duration\": 7, \"position\": \"37\"}, {\"name\": \"Triangle\", \"duration\": 10, \"position\": \"41\"}]','2024-08-04 16:51:10'),(4,'Sequence 4','[{\"name\": \"Pigeon\", \"duration\": 8, \"position\": \"28\"}, {\"name\": \"Shoulder Stand\", \"duration\": 10, \"position\": \"34\"}, {\"name\": \"Butterfly\", \"duration\": 9, \"position\": \"4\"}]','2024-08-04 16:51:10'),(5,'Sequence 5','[{\"name\": \"Dolphin\", \"duration\": 5, \"position\": \"14\"}, {\"name\": \"Bridge\", \"duration\": 9, \"position\": \"3\"}, {\"name\": \"Bow\", \"duration\": 10, \"position\": \"2\"}]','2024-08-04 16:51:10'),(6,'Sequence 6','[{\"name\": \"Warrior Two\", \"duration\": 9, \"position\": \"45\"}, {\"name\": \"Half-Moon\", \"duration\": 5, \"position\": \"23\"}, {\"name\": \"Downward-Facing Dog\", \"duration\": 8, \"position\": \"15\"}]','2024-08-04 16:51:10'),(7,'Sequence 7','[{\"name\": \"Child pose\", \"duration\": 5, \"position\": \"8\"}, {\"name\": \"Camel\", \"duration\": 7, \"position\": \"5\"}, {\"name\": \"Forearm Stand\", \"duration\": 5, \"position\": \"18\"}]','2024-08-04 16:51:10'),(8,'Sequence 8','[{\"name\": \"Lotus\", \"duration\": 6, \"position\": \"26\"}, {\"name\": \"Reverse Warrior\", \"duration\": 10, \"position\": \"32\"}, {\"name\": \"King Pigeon\", \"duration\": 7, \"position\": \"25\"}]','2024-08-04 16:51:10'),(9,'Sequence 9','[{\"name\": \"Reverse Warrior\", \"duration\": 8, \"position\": \"32\"}, {\"name\": \"Plank\", \"duration\": 6, \"position\": \"29\"}, {\"name\": \"Tree\", \"duration\": 5, \"position\": \"40\"}]','2024-08-04 16:51:10'),(10,'Sequence 10','[{\"name\": \"Plow\", \"duration\": 5, \"position\": \"30\"}, {\"name\": \"Pyramid\", \"duration\": 5, \"position\": \"31\"}, {\"name\": \"Low Lunge\", \"duration\": 7, \"position\": \"27\"}]','2024-08-04 16:51:10'),(11,'Sequence 11','[{\"name\": \"Low Lunge\", \"duration\": 7, \"position\": \"27\"}, {\"name\": \"Corpse\", \"duration\": 6, \"position\": \"9\"}, {\"name\": \"Half Lord of the Fishes\", \"duration\": 5, \"position\": \"22\"}]','2024-08-04 16:51:10'),(12,'Sequence 12','[{\"name\": \"Plow\", \"duration\": 9, \"position\": \"30\"}, {\"name\": \"Warrior Three\", \"duration\": 6, \"position\": \"44\"}, {\"name\": \"Pyramid\", \"duration\": 8, \"position\": \"31\"}]','2024-08-04 16:51:10'),(13,'Sequence 13','[{\"name\": \"Shoulder Stand\", \"duration\": 8, \"position\": \"34\"}, {\"name\": \"Boat\", \"duration\": 5, \"position\": \"1\"}, {\"name\": \"Seated Forward Bend\", \"duration\": 5, \"position\": \"33\"}]','2024-08-04 16:51:10'),(14,'Sequence 14','[{\"name\": \"Low Lunge\", \"duration\": 7, \"position\": \"27\"}, {\"name\": \"Warrior Two\", \"duration\": 9, \"position\": \"45\"}, {\"name\": \"Corpse\", \"duration\": 8, \"position\": \"9\"}]','2024-08-04 16:51:10'),(15,'Sequence 15','[{\"name\": \"Cow\", \"duration\": 10, \"position\": \"10\"}, {\"name\": \"Dolphin\", \"duration\": 7, \"position\": \"14\"}, {\"name\": \"Extended Side Angle\", \"duration\": 7, \"position\": \"17\"}]','2024-08-04 16:51:10'),(16,'Sequence 66b0ef1a413ff','[{\"name\": \"Boat\", \"duration\": 5, \"position\": \"1\"}, {\"name\": \"Bow\", \"duration\": 5, \"position\": \"2\"}, {\"name\": \"Bridge\", \"duration\": 5, \"position\": \"3\"}, {\"name\": \"Butterfly\", \"duration\": 5, \"position\": \"4\"}, {\"name\": \"Camel\", \"duration\": 5, \"position\": \"5\"}, {\"name\": \"Cat\", \"duration\": 5, \"position\": \"6\"}, {\"name\": \"Chair\", \"duration\": 5, \"position\": \"7\"}, {\"name\": \"Child pose\", \"duration\": 5, \"position\": \"8\"}, {\"name\": \"Corpse\", \"duration\": 5, \"position\": \"9\"}, {\"name\": \"Cow\", \"duration\": 5, \"position\": \"10\"}]','2024-08-05 15:26:18'),(17,'Sequence 66b0ef8e18da4','[{\"name\": \"Boat\", \"duration\": 5, \"position\": 1}, {\"name\": \"Bow\", \"duration\": 10, \"position\": 2}, {\"name\": \"Bridge\", \"duration\": 8, \"position\": 3}]','2024-08-05 15:28:14'),(18,'Sequence 66b0f01176ca0','[{\"name\": \"Boat\", \"duration\": 5, \"position\": \"1\"}, {\"name\": \"Bow\", \"duration\": 5, \"position\": \"2\"}, {\"name\": \"Bridge\", \"duration\": 5, \"position\": \"3\"}, {\"name\": \"Butterfly\", \"duration\": 5, \"position\": \"4\"}, {\"name\": \"Camel\", \"duration\": 5, \"position\": \"5\"}, {\"name\": \"Cat\", \"duration\": 5, \"position\": \"6\"}, {\"name\": \"Chair\", \"duration\": 5, \"position\": \"7\"}, {\"name\": \"Child pose\", \"duration\": 5, \"position\": \"8\"}, {\"name\": \"Corpse\", \"duration\": 5, \"position\": \"9\"}, {\"name\": \"Cow\", \"duration\": 5, \"position\": \"10\"}]','2024-08-05 15:30:25'),(19,'Sequence 66b0f2dc298d5','[{\"name\": \"Boat\", \"duration\": 7, \"position\": 1}, {\"name\": \"Bow\", \"duration\": 8, \"position\": 2}, {\"name\": \"Bridge\", \"duration\": 10, \"position\": 3}, {\"name\": \"Butterfly\", \"duration\": 7, \"position\": 4}, {\"name\": \"Camel\", \"duration\": 7, \"position\": 5}, {\"name\": \"Cat\", \"duration\": 10, \"position\": 6}, {\"name\": \"Chair\", \"duration\": 6, \"position\": 7}, {\"name\": \"Child pose\", \"duration\": 9, \"position\": 8}, {\"name\": \"Corpse\", \"duration\": 10, \"position\": 9}, {\"name\": \"Cow\", \"duration\": 8, \"position\": 10}]','2024-08-05 15:42:20');
/*!40000 ALTER TABLE `pose_sequences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `pid` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('p01','comb',11140,0.50),('p02','brush',30300,0.50),('p03','razor',15060,1.00);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `PID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int DEFAULT NULL,
  PRIMARY KEY (`PID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'computers',2000),(2,'clothes',100),(3,'cars',35000),(4,'films',50);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regions`
--

DROP TABLE IF EXISTS `regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regions` (
  `RID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tax` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`RID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regions`
--

LOCK TABLES `regions` WRITE;
/*!40000 ALTER TABLE `regions` DISABLE KEYS */;
INSERT INTO `regions` VALUES (1,'USA',0.08),(2,'UK',0.20),(3,'EMEA',0.18),(4,'Asia',0.12);
/*!40000 ALTER TABLE `regions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_token` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `membership_status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_session_token` (`session_token`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Tasbeha','tasbehanawaz@gmail.com','$2y$10$PHDHMsbu6nJ1uMz2k1DRqew0XX0wqkWcxsW7k/YUuyOodYrgjDLYK',NULL,NULL),(2,'Bisma','bismanawaz@gmail.com','$2y$10$lkWBJi8Y2jDX/bpNwvVa2eRsOSoG21gErKeCbVPOXLJQE0iiN0r3O',NULL,NULL),(3,'Ayesha','ayesha@gmail.com','$2y$10$l37xurNYDTj3MmYkudTQU.WTFn9nShiRrOwLs.SAJrtwTD5bZlS3m',NULL,NULL),(4,'Tasbee','tasbee@gmail.com','$2y$10$TriIg80S5v/8okL64a1wDe.zen397BNSyUqr5UaoevEWVAkwXkIRG',NULL,NULL),(5,'Maria','maria@gmail.com','$2y$10$MxFDQZZQU8HzHq1k2W4a7uLTBWX6KQkFs52KMvQ8pDYBXui8RBp4a',NULL,NULL),(6,'Louis','louis@gmail.com','$2y$10$D3CAhpwJY19fL1l6OdCMn.0uJnI03E44u5yelF8bcGhoXsfoI6Yji',NULL,NULL),(7,'Frank','frank@gmail.com','$2y$10$b5u8sy7pl5X2IhuSlMQaeOEQNXgH1Kypf0i/3V3qFmyymIKe8ObQS',NULL,NULL),(8,'Alex','alex@gmail.com','$2y$10$NmT0Gt3a8AchFGHAaOIxhub0ChANCmUsFmw.tJ7g5IkbenFx7Z28q',NULL,NULL),(9,'Justice','jus@gmail.com','$2y$10$tcUvnkx/kcNVJMZo4QFNCuu1Lc5CXzKa2BcsN2.bWGcuWXitYj0me',NULL,NULL),(10,'Sarah','sarah@gmail.com','$2y$10$oCMZDa9kbpzpS39C7YygjekFwKR/DpO5tTrgGBOT8gReisi4xEUte',NULL,NULL),(11,'Alex2','alex1@gmail.com','$2y$10$qtf.8x5U9aomrIMH8WivdOYI2AVLrFqQt07tcZYZ.SJmwXk9N9jZi',NULL,NULL),(12,'Ada','ada@gmail.com','$2y$10$94FoI7cOSpi8zd/ZnAJhb.4u.cNzorBBOfykChrR3ytOMnxMeeSO.','6548b21c67a05551dfa1f69a97a82237dd5cfa013f897146fe907540b59563bc',NULL),(13,'Elif','elif@gmail.com','$2y$10$oTcgH0h9jz1lRplfKWxvneLPCqFw6rio5sVlQLEmeX5.AI9Z0yej.',NULL,NULL),(14,'martin','martin@gmail.com','$2y$10$w6rYMJyHv5sqC0zTW4UHtug3XzN3QS7CfeIvcG2Fn21wqMuVGSkWG',NULL,NULL),(15,'safa','safa@gmail.com','$2y$10$HzUXi3Pjj.6oLMs4ALDrBOwAdcT4KvztliLoz.ZqOc0kHY0kljn22',NULL,NULL),(16,'tas','tas@gmail.com','$2y$10$gcLuGllviYSdAN9qzgq.0uTLgPZm21aHyPWpHJ3UbYHTEiJhumaSe','ee341e98e4f089f9dcd6aa83da61fdc9a77118b22365b353ed1c98a8bcd282f5',NULL),(17,'sarah1','sarah@outlook.com','$2y$10$CVlKIIF8cwWoWXxl3YbWreALlCOc/lbYGl3K2F3j6E8J1REKdv.Qy',NULL,NULL),(18,'sarah3','sarah1@gmail.com','$2y$10$HkfyA80jip9ughCo07JAgu.X4dbnerRuty0cTOOQnaFnBDvYqQuuu',NULL,NULL),(19,'sarah5','sarah5@gmail.com','$2y$10$V.W8DVELX2SCIXyAZxKQeeoJzBgq8T9nDJxDulq0dmI7aQMrgKTXO',NULL,NULL),(20,'tom','tom@gmail.com','$2y$10$wtKBkDPtT2A6DM5cyd.jS.L.7NOYHQcWXriCo83bGDo5B6R34x3YW','7da5ec5b6db7b27d3bcfc244ac1397e9815b6bf946e9798849e6906694bf5a3c',NULL),(21,'tom3','tom34@gmail.com','$2y$10$bUWo3XmPBGp9a3sf41XdxeVR3d67uBFQtYxIX8ZCQUkbRNCX7BaGq',NULL,NULL),(22,'Tommy','tommy34@gmail.com','$2y$10$zWnQDBlloz02nXni3xKXL.nUTXf7LTxsmkvw8djDMe5kHhFtRIfTO',NULL,NULL),(23,'Just','justiceeke62@gmail.com','$2y$10$jCPb8jnmrGjRMauXtraqKumRWlKq2aRe3U9yAUMs.4J1XpwiOMTze','f47e7920db16cd618b4ea730d35d586077c6b007acc229e1c7f8153683f03f30',NULL),(24,'kate','kate@gmail.com','$2y$10$q4qGIUaeTzto.0kaxwSdWuAnfn1uPX1uiZ7ZpIScodqvIJg.6qcXq',NULL,NULL),(25,'Joe David','joedavid@gmail.com','$2y$10$aAy7TaIofdigpiIV4Jp9iuQABZR51XioTYziwFVOoMETEmZ2yUXJ.',NULL,NULL),(26,'Thompson Jane','thompsonjane@yahoo.com','$2y$10$Rw7EFxxnIhBe75xuDXjP3u32dz5m.ttzy6CrEVYyaCBEqyazVmRdi',NULL,NULL),(27,'Tasbeha Nawaz','tas1@gmail.com','$2y$10$1DzYeaNF.KqKGv2AUD37eu2OC.PseBUVpKk/qiTDVz6AbayOq2ZVG',NULL,NULL),(28,'gel','gel@gmail.com','$2y$10$F.frxNyz2YBF4Yl4gCQJCenP0WTXvS1CvvjINf53eQov0ni9dAesa',NULL,NULL),(29,'cat','cat@gmail.com','$2y$10$/DoPPZl3lte1Oo34OuHYXOd.Ee0CIVBief5P9eqTkgkzdb3VG5m26','8e42034f312efe7e1f00a93b5e052c2b360796eae1323be38fba7663ee7e641e',NULL),(30,'sam','sam@gmail.com','$2y$10$n63PAgA73cz1uXKeIUj6cunay9E4MDRbRGk1YJcvsjzWMd7JWUSzi','fc8cd84865c6cb56b83786c64a705b8148c4e2e8358306923d6ca1340e2fd8d7',NULL),(31,'sammy','sammy@gmail.com','$2y$10$e0CS9KhGJtZJXgpgC4HKZ.gCb43cWhgMlCySqqeoII3Aszfh3uAtK',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videos`
--

DROP TABLE IF EXISTS `videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `video_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videos`
--

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
INSERT INTO `videos` VALUES (1,'http://localhost:8001/output/yoga_sequence_66872bf754fa2.mp4','2024-07-04 23:14:40'),(2,'http://localhost:8001/output/yoga_sequence_6687338d3dbcf.mp4','2024-07-04 23:43:47'),(3,'http://localhost:8001/output/yoga_sequence_668733e179afb.mp4','2024-07-04 23:47:13'),(4,'http://localhost:8001/output/yoga_sequence_668735fbaacd0.mp4','2024-07-04 23:56:25'),(5,'http://localhost:8001/output/yoga_sequence_66873f3d071e9.mp4','2024-07-05 00:33:35'),(6,'http://localhost:8001/output/yoga_sequence_66874037326d7.mp4','2024-07-05 00:38:28'),(7,'http://localhost:8001/output/yoga_sequence_66882d1e66fe5.mp4','2024-07-05 17:28:38'),(8,'http://localhost:8001/output/yoga_sequence_668d1cd52650a.mp4','2024-07-09 11:20:34'),(9,'http://localhost:8001/output/yoga_sequence_6692d816e6ebd.mp4','2024-07-13 19:40:16'),(10,'http://localhost:8001/output/yoga_sequence_6694349a40a1a.mp4','2024-07-14 22:17:14'),(11,'http://localhost:8001/output/yoga_sequence_66992aef8a8e9.mp4','2024-07-18 14:54:38'),(12,'http://localhost:8001/output/yoga_sequence_66994e68b923d.mp4','2024-07-18 17:20:00'),(13,'http://localhost:8001/output/yoga_sequence_66995970166fa.mp4','2024-07-18 18:05:52'),(14,'http://localhost:8001/output/yoga_sequence_6699957698353.mp4','2024-07-18 22:27:06'),(15,'http://localhost:8001/output/yoga_sequence_669e4070eb3c3.mp4','2024-07-22 11:20:21'),(16,'http://localhost:8001/output/yoga_sequence_669e4a9bf259c.mp4','2024-07-22 12:03:47'),(17,'http://localhost:8001/output/yoga_sequence_669e4e16637f0.mp4','2024-07-22 12:18:42'),(18,'http://localhost:8001/output/yoga_sequence_66aa3564ee9cf.mp4','2024-07-31 13:00:41'),(19,'http://localhost:8001/output/yoga_sequence_66b2996fef79e.mp4','2024-08-06 21:45:32'),(20,'http://localhost:8001/output/yoga_sequence_66b2c718819ce.mp4','2024-08-07 01:00:58'),(21,'http://localhost:8001/output/yoga_sequence_66b2c8f0bd5ea.mp4','2024-08-07 01:08:17'),(22,'http://localhost:8001/output/yoga_sequence_66b2d9d4e17c4.mp4','2024-08-07 02:20:20'),(23,'http://localhost:8001/output/yoga_sequence_66b2d9de95022.mp4','2024-08-07 02:20:20'),(24,'http://localhost:8001/output/yoga_sequence_66b2dc1116af3.mp4','2024-08-07 02:29:54'),(25,'http://localhost:8001/output/yoga_sequence_66b2de58d22ab.mp4','2024-08-07 02:40:16'),(26,'http://localhost:8001/output/yoga_sequence_66b2dea89afdf.mp4','2024-08-07 02:40:53'),(27,'http://localhost:8001/output/yoga_sequence_66b2dffa593d7.mp4','2024-08-07 02:46:25'),(28,'http://localhost:8001/output/yoga_sequence_66b2e0243b981.mp4','2024-08-07 02:47:05'),(29,'http://localhost:8001/output/yoga_sequence_66b2e10ae7768.mp4','2024-08-07 02:51:08'),(30,'http://localhost:8001/output/yoga_sequence_66b2e228e039d.mp4','2024-08-07 02:55:51'),(31,'http://localhost:8001/output/yoga_sequence_66b2e36555862.mp4','2024-08-07 03:01:07'),(32,'http://localhost:8001/output/yoga_sequence_66b2e38d9363c.mp4','2024-08-07 03:01:36'),(33,'http://localhost:8001/output/yoga_sequence_66b9210e26676.mp4','2024-08-11 20:37:45'),(34,'http://localhost:8001/output/yoga_sequence_66b9797c16c12.mp4','2024-08-12 02:57:08'),(35,'http://localhost:8001/output/yoga_sequence_66ba6f9a438a4.mp4','2024-08-12 20:25:12'),(36,'http://localhost:8001/output/yoga_sequence_66ba74f65abc5.mp4','2024-08-12 20:48:27');
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `yoga_pose_audio`
--

DROP TABLE IF EXISTS `yoga_pose_audio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `yoga_pose_audio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pose_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `audio_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `yoga_pose_audio`
--

LOCK TABLES `yoga_pose_audio` WRITE;
/*!40000 ALTER TABLE `yoga_pose_audio` DISABLE KEYS */;
INSERT INTO `yoga_pose_audio` VALUES (78,'Boat','audio/Boat.mp3','2024-07-14 19:38:22'),(79,'Bow','audio/Bow.mp3','2024-07-14 19:38:26'),(80,'Bridge','audio/Bridge.mp3','2024-07-14 19:38:32'),(81,'Butterfly','audio/Butterfly.mp3','2024-07-14 19:38:35'),(82,'Camel','audio/Camel.mp3','2024-07-14 19:38:48'),(83,'Cat','audio/Cat.mp3','2024-07-14 19:38:52'),(84,'Chair','audio/Chair.mp3','2024-07-14 19:38:56'),(85,'Child\'s Pose','audio/Child\'s Pose.mp3','2024-07-14 19:39:00'),(86,'Corpse','audio/Corpse.mp3','2024-07-14 19:39:05'),(87,'Cow','audio/Cow.mp3','2024-07-14 19:39:07'),(88,'Crescent Lunge','audio/Crescent Lunge.mp3','2024-07-14 19:39:09'),(89,'Crescent Moon','audio/Crescent Moon.mp3','2024-07-14 19:39:11'),(90,'Crow','audio/Crow.mp3','2024-07-14 19:39:16'),(91,'Dolphin','audio/Dolphin.mp3','2024-07-14 19:39:19'),(92,'Downward-Facing Dog','audio/Downward-Facing Dog.mp3','2024-07-14 19:39:23'),(93,'Eagle','audio/Eagle.mp3','2024-07-14 19:39:28'),(94,'Extended Hand to Toe','audio/Extended Hand to Toe.mp3','2024-07-14 19:39:32'),(95,'Extended Side Angle','audio/Extended Side Angle.mp3','2024-07-14 19:39:36'),(96,'Forearm Stand','audio/Forearm Stand.mp3','2024-07-14 19:39:41'),(97,'Forward Bend with Shoulder Opener','audio/Forward Bend with Shoulder Opener.mp3','2024-07-14 19:39:47'),(98,'Garland Pose','audio/Garland Pose.mp3','2024-07-14 19:39:52'),(99,'Half Boat','audio/Half Boat.mp3','2024-07-14 19:39:59'),(100,'Half Lord of the Fishes','audio/Half Lord of the Fishes.mp3','2024-07-14 19:40:05'),(101,'Half-Moon','audio/Half-Moon.mp3','2024-07-14 19:40:13'),(102,'Handstand','audio/Handstand.mp3','2024-07-14 19:40:20'),(103,'King Pigeon','audio/King Pigeon.mp3','2024-07-14 19:40:26'),(104,'Lotus','audio/Lotus.mp3','2024-07-14 19:40:28'),(105,'Low Lunge','audio/Low Lunge.mp3','2024-07-14 19:40:34'),(106,'Pigeon','audio/Pigeon.mp3','2024-07-14 19:40:36'),(107,'Plank','audio/Plank.mp3','2024-07-14 19:40:42'),(108,'Plow','audio/Plow.mp3','2024-07-14 19:40:50'),(109,'Pyramid','audio/Pyramid.mp3','2024-07-14 19:40:56'),(110,'Reverse Warrior','audio/Reverse Warrior.mp3','2024-07-14 19:40:59'),(111,'Seated Forward Bend','audio/Seated Forward Bend.mp3','2024-07-14 19:41:02'),(112,'Shoulder Stand','audio/Shoulder Stand.mp3','2024-07-14 19:41:06'),(113,'Side Plank','audio/Side Plank.mp3','2024-07-14 19:41:16'),(114,'Side Splits','audio/Side Splits.mp3','2024-07-14 19:41:19'),(115,'Sphinx','audio/Sphinx.mp3','2024-07-14 19:41:25'),(116,'Splits','audio/Splits.mp3','2024-07-14 19:41:29'),(117,'Standing Forward Bend','audio/Standing Forward Bend.mp3','2024-07-14 19:41:35'),(118,'Tree','audio/Tree.mp3','2024-07-14 19:41:40'),(119,'Triangle','audio/Triangle.mp3','2024-07-14 19:41:46'),(120,'Upward-Facing Dog','audio/Upward-Facing Dog.mp3','2024-07-14 19:41:51'),(121,'Warrior One','audio/Warrior One.mp3','2024-07-14 19:41:57'),(122,'Warrior Three','audio/Warrior Three.mp3','2024-07-14 19:42:02'),(123,'Warrior Two','audio/Warrior Two.mp3','2024-07-14 19:42:09'),(124,'Wheel','audio/Wheel.mp3','2024-07-14 19:42:13'),(125,'Wild Thing','audio/Wild Thing.mp3','2024-07-14 19:42:18');
/*!40000 ALTER TABLE `yoga_pose_audio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `yoga_poses`
--

DROP TABLE IF EXISTS `yoga_poses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `yoga_poses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `yoga_poses`
--

LOCK TABLES `yoga_poses` WRITE;
/*!40000 ALTER TABLE `yoga_poses` DISABLE KEYS */;
INSERT INTO `yoga_poses` VALUES (43,'Bow','From a prone position with the abdomen on the earth, the hands grip the ankles (but not the tops of the feet) with knees no wider than the width of your hips.  The heels are lifted away from the buttocks and at the same time the thighs are lifted away from the earth working opposing forces as the heart center, hips and back open.  The gaze is forward.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483072/yoga-api/3_aa0fgk.png'),(44,'Butterfly','In sitting position, bend both knees and drop the knees to each side, opening the hips.  Bring the soles of the feet together and bring the heels as close to the groin as possible, keeping the knees close to the ground.  The hands may reach down and grasp and maneuver the feet so that the soles are facing upwards and the heels and little toes are connected.  The shoulders should be pulled back and no rounding of the spine.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483074/yoga-api/5_i64gif.png'),(45,'Dolphin','From Downward-Facing Dog, the forearms are planted onto the earth with the elbows narrow and the palms down in a Sphinx position. The pelvis is tucked. The ribcage lifted. The feet are rooted and the legs are straight with the tailbone in dog tilt. The gaze is down and slightly forward.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483080/yoga-api/14_k9lr9a.png'),(46,'Crow','From an inverted position, with the hips up and the head down, the arms are bent in a 90-degree angle with the knees resting on the elbows.  The palms are firmly rooted into the earth with knuckles pressed firmly into the earth for support.  The belly is pulled up and in towards the spine with the ribcage and chin lifted.  The weight of the body shifts slightly forward as the toes lift up and off the earth into the full expression of the pose.  The gaze is down and slightly forward.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483083/yoga-api/13_hdjxuz.png'),(47,'Eagle','From a standing position the one thigh is crossed over the other with the toes and/or the ankle hooked behind the lower calf.  The weight of the body is balanced on the standing foot.  The arms are crossed in front of the torso so that one arm is crossed above the other arm.  The top arm is tucked into the elbow crook of the bottom arm.  The hands are hooked around each other as well.  Once hooked, the elbows lift up and the fingers stretch towards the ceiling.  The gaze is soft and forward.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483081/yoga-api/16_g7ueht.png'),(48,'Half Boat','From a seated position the hands are gripped around the back of the legs and the knees are bent in a 90 degree angle.  Both legs are pulled in towards the abdomen.  The core is engaged to maintain balance on the sits bones (be sure that the back does not round).  The front of the torso lengthens between the pubis and top of the sternum as the spine extends in both directions reaching up to the sky and rooting down to the earth.  The gaze is forward and Bandhas are engaged.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483073/yoga-api/2_ozh7sv.png'),(49,'Forward Bend with Shoulder Opener','From a standing position, the body is folded over at the crease of the hip with the spine long.  The neck is relaxed and the crown of the head is towards the earth.  The feet are rooted into the earth.  The toes are actively lifted.  The spine is straight.  The ribcage is lifted.  The chest and the thighs are connected.  The sacrum lifts up toward the sky in dog tilt.  The fingers are interlaced behind the body and the palms are together.  The arms and elbows are straight.  The shoulder blades rotate towards each other as the hands move forward (away from the lower back).  The gaze is down and inward.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483085/yoga-api/20_uogrfq.png'),(50,'Half-Moon','From a standing position one leg is straight while the other is extended back parallel to the earth (or a little above parallel) and one hand is on the earth (beyond the little-toe side of the foot, about 12 inches) while the other hand is extended up towards the sky.  The shoulder blades are squeezed together and the fingers move outward in opposing directions.  The weight of the body is supported mostly by the standing leg while the bottom hand has very little weight on it but is used intelligently to regulate balance.  The upper torso is rotated open to the sky.  Both hips are externally rotated.  Energy is extended actively through the flexed toes to keep the raised leg strong.  The inner ankle of the standing foot is lifted strongly upward, as if drawing energy from the earth.  The sacrum and scapulae are firmly pressed against the back torso and lengthen the coccyx toward the raised foot.  The gaze is either up or down, depending on the condition of the neck.  If injured the gaze is down.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483085/yoga-api/21_etedlp.png'),(51,'Cow','From  box neutral the ribcage is lifted with a gentle sway in the low back.  The tailbone lifts up into dog tilt.  The eyes are soft and the gaze is to the sky.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483077/yoga-api/8_wi10sn.png'),(52,'Camel','From a kneeling position the knees are hip width apart and the thighs are perpendicular to the earth.  The inner thighs are narrowed and rotated slightly inward with the buttocks engaged but not hardened.  The tailbone is tucked under but the hips do not puff forward.  The shins and tops of the feet are pressed firmly into the earth.  The ribcage is open, along with the heart center, but the lower front ribs do not protrude sharply towards the sky.  The lower back lifts the ribs away from the pelvis to keep the lower spine as long as possible.  The base of the palms are pressed firmly against the soles (or heels) of the feet and the fingers are pointed toward the toes.  The arms are extended straight and are turned slightly outward at the shoulder joint so the elbow creases face forward without squeezing the shoulder blades together.  The neck is in a relatively neutral position, neither flexed nor extended, or (for the advanced practitioners only) the head drops back.  Be careful not to strain your neck and harden your throat.  The gaze is either towards the sky or towards the earth, depending upon your flexibility.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483075/yoga-api/6_ri1w0e.png'),(53,'Chair','From a standing position, the feet are together and rooted into the earth with toes actively lifted.  The knees are bent and the weight of the body is on the heels of the feet.  The pelvis is tucked in and the ribcage is lifted.  The neck is a natural extension of the spine.  The arms are lifted up toward the sky with the elbows straight and the biceps by the ears.  The hands can be together or separated and facing each other with the fingers spread wide.  The gaze is forward.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483078/yoga-api/9_ewvoun.png'),(54,'Boat','From a seated position the feet are lifted up so that the thighs are angled about 45-50 degrees relative to the earth.  The tailbone is lengthened into the earth and the pubis pulls toward the navel.  The shoulder blades are spread across the back and the hands reach around the back of the calves, with legs pulled towards the body.  The chin is tipped slightly toward the sternum so that the base of the skull lifts lightly away from the back of the neck.  Gaze is forward.','https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483071/yoga-api/1_txmirf.png');
/*!40000 ALTER TABLE `yoga_poses` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-24 19:23:17
