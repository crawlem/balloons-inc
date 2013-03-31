<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'balloonsinc');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'K$m}Bko~_Rt%B9p64U#sj|-#{SP.g-p@R+.7JI[};`yM]8]d//RCRN5cFX/#O1|K');
define('SECURE_AUTH_KEY',  'W#IihxjwUA9;,*|V7@|&T.Y_jZanN%{,M,3P>j0D9{vRO*~K?2@Qrl)l>pqetmBp');
define('LOGGED_IN_KEY',    '[b=&so]&J+2HU&}rXl|Hr=6AoK&v:r^4l]!{g8)*|A!_O`^D4vDMFXDz~-bKjbHx');
define('NONCE_KEY',        '>/4}2.]2u%+2%HWC(=L#Y!lM|=Zx}.1j{uZ20|w6}7WyJuN=-hLF7!sKM7(l7.3(');
define('AUTH_SALT',        'IA5L/e&n{-nCt^Fq~o8W5(YuJk-_}+dfO;.2;/SQ%xeBMQ<+n5m:b(sg&}cCBgJ|');
define('SECURE_AUTH_SALT', '$+4mxJM7Q>O(Ha@QSf$e=-q!GH~,|:bf->X&4Zi{iHbu:|u!U;|5|g9_uQTjNPm1');
define('LOGGED_IN_SALT',   'PsOfieybSl{S5Jf.Iui.`:]BWDV:SN?s|7<|;dbv(KrS|[+9S-dsdz$T#YT:!5{J');
define('NONCE_SALT',       'fbE#5*=DwQw4jkYcne2H&}{XlQT.*kx;de#YF-R/RFw]6Yub7t[7.SGioB_)+OBi');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'bi_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', true);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
