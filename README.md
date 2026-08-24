<!DOCTYPE html>
<html lang="en" id="htmlRoot">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>InnoDignity - Sovereign Bio-Intelligence Ecosystem</title>
    <style>
        :root {
            --primary: #0f172a;
            --tech-blue: #0284c7;
            --accent: #38bdf8;
            --bg: #f0f9ff;
            --text: #1e293b;
            --card-bg: #ffffff;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: var(--bg);
            color: var(--text);
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }
        .top-bar {
            background: var(--primary);
            padding: 0.75rem 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: white;
        }
        .top-bar select {
            padding: 0.4rem;
            border-radius: 6px;
            background: #1e293b;
            color: white;
            border: 1px solid var(--accent);
            font-size: 0.9rem;
            cursor: pointer;
        }
        header {
            background: linear-gradient(135deg, #0f172a, #0369a1);
            color: white;
            padding: 3rem 1rem;
            text-align: center;
        }
        .hero-img {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid var(--accent);
            margin-bottom: 1rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }
        header h1 {
            margin: 0;
            font-size: 2.5rem;
            letter-spacing: -0.025em;
        }
        header p {
            color: #bae6fd;
            margin-top: 0.5rem;
            font-size: 1.2rem;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }
        .container {
            max-width: 1000px;
            margin: 2rem auto;
            padding: 0 1rem;
        }
        .card {
            background: var(--card-bg);
            border-radius: 12px;
            padding: 2rem;
            margin-bottom: 1.5rem;
            box-shadow: 0 10px 15px -3px rgba(2, 132, 199, 0.1);
            border-top: 4px solid var(--tech-blue);
        }
        h2 {
            color: var(--primary);
            border-bottom: 2px solid var(--accent);
            padding-bottom: 0.5rem;
            margin-top: 0;
        }
        ul {
            padding-left: 1.5rem;
        }
        li {
            margin-bottom: 0.6rem;
        }
        footer {
            text-align: center;
            padding: 2rem;
            color: #475569;
            font-size: 0.9rem;
            border-top: 1px solid #bae6fd;
            margin-top: 3rem;
            background: #e0f2fe;
        }
    </style>
</head>
<body>

    <div class="top-bar">
        <strong>InnoDignity | Nazih Osman</strong>
        <select id="langSelector" onchange="changeLanguage(this.value)">
            <option value="en">English</option>
            <option value="ar">العربية</option>
            <option value="he">עברית</option>
            <option value="de">Deutsch</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
        </select>
    </div>

    <header>
        <!-- استبدل الرابط أدناه برابط صورتك المضيئة المرفوعة أو مسارها في المستودع -->
        <img src="1000118451.png" alt="Welcome to InnoDignity" class="hero-img">
        <h1 id="t-title">InnoDignity</h1>
        <p id="t-subtitle">مرحباً بك في موقع حفظ الكرامة الإنسانية - Technology of the Future</p>
    </header>

    <div class="container">
        <div class="card">
            <h2 id="t-welcome-h">أهلاً وسهلاً - أوقات سعيدة، اشعر بالراحة، أنت بأيدي أمينة</h2>
            <p id="t-welcome-p">هذا الموقع مهتم جداً بحفظ الكرامة لكبار السن، المعاقين، الأطفال الخدج، السائق، المتجولين، والرعاية النسائية من خلال منظومة ذكاء حيوي سيادي متكاملة ومتقدمة.</p>
        </div>

        <div class="card">
            <h2 id="t-pillars-h">الركائز التكنولوجية الأساسية</h2>
            <ul>
                <li><strong id="t-p1-title">الملابس الحيوية الذكية:</strong> <span id="t-p1-desc">منسوجات طبية وأقمشة استشعار حيوي متقدمة، بما في ذلك الملابس الداخلية الطبية المتخصصة (תחתונים)، للمراقبة الصحية المستمرة.</span></li>
                <li><strong id="t-p2-title">السكرتير الرقمي السيادي (SDS):</strong> <span id="t-p2-desc">رفيق ذكاء اصطناعي محلي ومتعدد اللغات يعمل على الجهاز لضمان الخصوصية التامة بدون سحابة.</span></li>
                <li><strong id="t-p3-title">السرير السيادي وتقنيات الاستقلالية:</strong> <span id="t-p3-desc">ديناميكيات ميكاترونيكية تتيح الانتقال من وضعية النوم إلى الجلوس والوقوف بكل استقلالية وأمان.</span></li>
            </ul>
        </div>

        <div class="card">
            <h2 id="t-doctrine-h">مبدأ الأصفار الخمسة (Five Zeros Doctrine)</h2>
            <ul>
                <li id="t-d1">صفر نفايات، صفر تلوث، وصفر أضرار.</li>
                <li id="t-d2">صفر روائح، صفر أخطاء سريرية، وصفر إهمال.</li>
                <li id="t-d3">صفر استبعاد، صفر فقدان للبيانات، وصفر مساس بالكرامة.</li>
            </ul>
        </div>
    </div>

    <footer>
        <p id="t-footer">&copy; 2026 InnoDignity - Founder & Lead Developer: Nazih Osman. All Rights Reserved.</p>
    </footer>

    <script>
        const translations = {
            ar: {
                title: "InnoDignity",
                subtitle: "مرحباً بك في موقع حفظ الكرامة الإنسانية - تكنولوجيا المستقبل",
                welcomeH: "أهلاً وسهلاً - أوقات سعيدة، اشعر بالراحة، أنت بأيدي أمينة",
                welcomeP: "هذا الموقع مهتم جداً بحفظ الكرامة لكبار السن، المعاقين، الأطفال الخدج، السائق، المتجولين، والرعاية النسائية من خلال منظومة ذكاء حيوي سيادي متكاملة.",
                pillarsH: "الركائز التكنولوجية الأساسية",
                p1Title: "الملابس الحيوية الذكية:",
                p1Desc: "منسوجات طبية وأقمشة استشعار حيوي متقدمة، بما في ذلك الملابس الداخلية الطبية المتخصصة (תחתונים)، للمراقبة الصحية المستمرة.",
                p2Title: "السكرتير الرقمي السيادي (SDS):",
                p2Desc: "رفيق ذكاء اصطناعي محلي ومتعدد اللغات يعمل على الجهاز لضمان الخصوصية التامة بدون سحابة.",
                p3Title: "السرير السيادي وتقنيات الاستقلالية:",
                p3Desc: "ديناميكيات ميكاترونيكية تتيح الانتقال من وضعية النوم إلى الجلوس والوقوف بكل استقلالية وأمان.",
                doctrineH: "مبدأ الأصفار الخمسة",
                d1: "صفر نفايات، صفر تلوث، وصفر أضرار.",
                d2: "صفر روائح، صفر أخطاء سريرية، وصفر إهمال.",
                d3: "صفر استبعاد، صفر فقدان للبيانات، وصفر مساس بالكرامة.",
                footer: "© 2026 InnoDignity - المؤسس ومطور الرئاسة: Nazih Osman. جميع الحقوق محفوظة."
            },
            en: {
                title: "InnoDignity",
                subtitle: "Welcome to Human Dignity Preservation - Technology of the Future",
                welcomeH: "Welcome - Have a wonderful time, feel relaxed, you are in safe hands",
                welcomeP: "This platform is dedicated to preserving the dignity of the elderly, disabled, premature infants, drivers, travelers, and women's healthcare through an advanced sovereign bio-intelligence ecosystem.",
                pillarsH: "Core Technological Pillars",
                p1Title: "Smart Bio-Garments:",
                p1Desc: "Medical textiles and advanced biosensing fabrics, including specialized medical underwear (תחתונים), for continuous health monitoring.",
                p2Title: "Sovereign Digital Secretary (SDS):",
                p2Desc: "On-device localized multilingual AI companion ensuring complete data privacy.",
                p3Title: "Sovereign Bed & Autonomy Technologies:",
                p3Desc: "Mechatronic dynamics allowing seamless transition from sleeping to sitting and standing positions.",
                doctrineH: "The Five Zeros Doctrine",
                d1: "Zero waste, zero pollution, and zero harm.",
                d2: "Zero odor, zero clinical error, and zero neglect.",
                d3: "Zero exclusion, zero data-loss, and zero indignity.",
                footer: "© 2026 InnoDignity - Founder & Lead Developer: Nazih Osman. All Rights Reserved."
            },
            he: {
                title: "InnoDignity",
                subtitle: "ברוכים הבאים לאתר שימור הכבוד האנושי - טכנולוגיית העתיד",
                welcomeH: "ברוכים הבאים - שעות נעימות, תרגישו בנוח, אתם בידיים בטוחות",
                welcomeP: "אתר זה מוקדש לשימור הכבוד של קשישים, בעלי מוגבלויות, תינוקות פגים, נהגים, מטיילים וטיפול בריאותי לנשים באמצעות אקולוגיה ריבונית מתקדמת.",
                pillarsH: "עמודי התווך הטכנולוגיים",
                p1Title: "בגדים ביו-חכמים:",
                p1Desc: "טקסטיל רפואי وبדים מתקדמים, כולל תחתונים רפואיים ייעודיים (תחתונים), לניטור בריאות רציף.",
                p2Title: "מזכיר דיגיטלי ריבוני (SDS):",
                p2Desc: "בן לוויה של בינה מלאכותית מקומית המבטיחה פרטיות נתונים מוחלטת.",
                p3Title: "מיטה ריבונית וטכנולוגיות אוטונומיה:",
                p3Desc: "דינמיקה מכטרוניקה המאפשרת מעבר חלק משכיבה לישיבה ולעמידה.",
                doctrineH: "דוקטרינת חמשת האפסים",
                d1: "אפס פסולת, אפס זיהום ואפס נזק.",
                d2: "אפס ריחות, אפס שגיאות קליניות ואפס הזנחה.",
                d3: "אפס הדרה, אפס אובדן נתונים ואפס פגיעה בכבוד.",
                footer: "© 2026 InnoDignity - מייסד ומפתח ראשי: Nazih Osman. כל הזכויות שמורות."
            },
            de: {
                title: "InnoDignity",
                subtitle: "Willkommen zur Bewahrung der Menschenwürde - Technologie der Zukunft",
                welcomeH: "Herzlich willkommen - Schöne Grüße, fühlen Sie sich wohl, Sie sind in sicheren Händen",
                welcomeP: "Diese Plattform widmet sich der Bewahrung der Würde von Senioren, Menschen mit Behinderungen, Frühgeborenen, Fahrern, Reisenden und der Frauengesundheit.",
                pillarsH: "Technologische Säulen",
                p1Title: "Intelligente Bio-Kleidung:",
                p1Desc: "Medizinische Textilien und Biosensorik, einschließlich spezieller medizinischer Unterwäsche (תחתונים), zur Gesundheitsüberwachung.",
                p2Title: "Souveräner Digitaler Sekretär (SDS):",
                p2Desc: "Lokaler KI-Begleiter für absolute Datensicherheit.",
                p3Title: "Souveränes Bett & Autonomie-Technologien:",
                p3Desc: "Mechatronische Dynamik für den Übergang vom Liegen zum Sitzen und Stehen.",
                doctrineH: "Die Fünf-Nullen-Doktrin",
                d1: "Null Abfall, Null Umweltverschmutzung, Null Schaden.",
                d2: "Null Geruch, Null klinische Fehler, Null Vernachlässigung.",
                d3: "Null Ausschluss, Null Datenverlust, Null Würdelosigkeit.",
                footer: "© 2026 InnoDignity - Gründer & Entwickler: Nazih Osman. Alle Rechte vorbehalten."
            },
            fr: {
                title: "InnoDignity",
                subtitle: "Bienvenue sur la préservation de la dignité humaine - Technologie du futur",
                welcomeH: "Bienvenue - Passez un bon moment, détendez-vous, vous êtes entre bonnes mains",
                welcomeP: "Cette plateforme se consacre à la préservation de la dignité des personnes âgées, handicapées, prématurées, conducteurs, voyageurs et de la santé des femmes.",
                pillarsH: "Piliers Technologiques",
                p1Title: "Vêtements Bio-Intelligents:",
                p1Desc: "Textiles médicaux et bio-capteurs, y compris des sous-vêtements médicaux (תחתונים), pour le suivi.",
                p2Title: "Secrétaire Numérique Souverain (SDS):",
                p2Desc: "Compagnon d'IA local garantissant une confidentialité totale.",
                p3Title: "Lit Souverain & Technologies d'Autonomie:",
                p3Desc: "Dynamique mécatronique permettant la transition de la position allongée à assise et debout.",
                doctrineH: "La Doctrine des Zéros",
                d1: "Zéro déchet, zéro pollution, zéro dommage.",
                d2: "Zéro odeur, zéro erreur clinique, zéro négligence.",
                d3: "Zéro exclusion, zéro perte de données, zéro indignité.",
                footer: "© 2026 InnoDignity - Fondateur: Nazih Osman. Tous droits réservés."
            },
            es: {
                title: "InnoDignity",
                subtitle: "Bienvenidos a la Preservación de la Dignidad Humana - Tecnología del Futuro",
                welcomeH: "Bienvenidos - Tengan un buen momento, siéntanse relajados, están en buenas manos",
                welcomeP: "Esta plataforma está dedicada a preservar la dignidad de los ancianos, discapacitados, bebés prematuros, conductores, viajeros y la salud de la mujer.",
                pillarsH: "Pilares Tecnológicos",
                p1Title: "Bio-prendas Inteligentes:",
                p1Desc: "Textiles médicos y biosensores, incluyendo ropa interior médica (תחתונים), para el monitoreo continuo.",
                p2Title: "Secretario Digital Soberano (SDS):",
                p2Desc: "Compañero de IA local que garantiza la privacidad total.",
                p3Title: "Cama Soberana y Tecnologías de Autonomía:",
                p3Desc: "Dinámica mecatrónica que permite la transición de acostado a sentado y de pie.",
                doctrineH: "La Doctrina de los Ceros",
                d1: "Cero residuos, cero contaminación, cero daños.",
                d2: "Cero olores, cero errores clínicos, cero negligencia.",
                d3: "Cero exclusión, cero pérdida de datos, cero indignidad.",
                footer: "© 2026 InnoDignity - Fundador: Nazih Osman. Todos los derechos reservados."
            }
        };

        function changeLanguage(lang) {
            const root = document.getElementById('htmlRoot');
            root.setAttribute('lang', lang);
            if(lang === 'ar' || lang === 'he') {
                root.setAttribute('dir', 'rtl');
            } else {
                root.setAttribute('dir', 'ltr');
            }

            const t = translations[lang];
            document.getElementById('t-title').innerText = t.title;
            document.getElementById('t-subtitle').innerText = t.subtitle;
            document.getElementById('t-welcome-h').innerText = t.welcomeH;
            document.getElementById('t-welcome-p').innerText = t.welcomeP;
            document.getElementById('t-pillars-h').innerText = t.pillarsH;
            document.getElementById('t-p1-title').innerText = t.p1Title;
            document.getElementById('t-p1-desc').innerText = t.p1Desc;
            document.getElementById('t-p2-title').innerText = t.p2Title;
            document.getElementById('t-p2-desc').innerText = t.p2Desc;
            document.getElementById('t-p3-title').innerText = t.p3Title;
            document.getElementById('t-p3-desc').innerText = t.p3Desc;
            document.getElementById('t-doctrine-h').innerText = t.doctrineH;
            document.getElementById('t-d1').innerText = t.d1;
            document.getElementById('t-d2').innerText = t.d2;
            document.getElementById('t-d3').innerText = t.d3;
            document.getElementById('t-footer').innerText = t.footer;
        }
    </script>
</body>
</html>
