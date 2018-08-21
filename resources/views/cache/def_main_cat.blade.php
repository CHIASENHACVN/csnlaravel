<?php

if ( !ENV('IN_PHPBB') )
{
    die('Hacking attempt');
    exit;
}
global $cat_id2info;
global $cat_url2info;

$cat_id2info = array(
	1 => array(
		0 => array('cat_id' => '1', 
			'cat_level' => '0', 
			'cat_title' => 'Video Clip', 
			'cat_short_title' => 'Video Clip', 
			'cat_url' => 'video', 
			'cat_music' => '0', 
			'cat_order' => '10', 
			'cat_last_hot_song' => '1001394,1000456,1000368,1000457,1000455,401902,400087,1000002,1000006,1000010'),
		1 => array('cat_id' => '1', 
			'cat_level' => '1', 
			'cat_title' => 'Video Việt Nam', 
			'cat_short_title' => 'Việt Nam', 
			'cat_url' => 'v-video', 
			'cat_music' => '0', 
			'cat_order' => '10', 
			'cat_last_hot_song' => '1937309,1936640,1926295,1933328,1938078,1926297,1926462,1930241,1933941,1791676,1767409,1938080,1939077,1817925,1930880,1932204,1906381,1780520,1777301,1792156,1936678,1905235,1798668,1935414,1935920'),
		2 => array('cat_id' => '1', 
			'cat_level' => '2', 
			'cat_title' => 'Video US-UK', 
			'cat_short_title' => 'US-UK', 
			'cat_url' => 'us-video', 
			'cat_music' => '0', 
			'cat_order' => '20', 
			'cat_last_hot_song' => '1829164,1937279,1929110,1770878,1913304,1886195,1913254,1931012,1825875,1838299,1908789,1929169,1820040,1766417,1929105,1936455,1906319,1796440,1924926,1780816,1781658,1803486,1824261,1838617,1864784'),
		3 => array('cat_id' => '1', 
			'cat_level' => '3', 
			'cat_title' => 'Video Hoa', 
			'cat_short_title' => 'Hoa', 
			'cat_url' => 'c-video', 
			'cat_music' => '0', 
			'cat_order' => '30', 
			'cat_last_hot_song' => '1817881,1896207,1817880,1827059,1896206,1817232,1760039,1783271,1756299,1758548,1764380,1764576,1764577,1764579,1764580,1764581,1764582,1764585,1764587,1764591,1764590,1781146,1793635,1804289,1793636'),
		4 => array('cat_id' => '1', 
			'cat_level' => '4', 
			'cat_title' => 'Video Hàn', 
			'cat_short_title' => 'Hàn', 
			'cat_url' => 'k-video', 
			'cat_music' => '0', 
			'cat_order' => '40', 
			'cat_last_hot_song' => '1937727,1919140,1781680,1940037,1934851,1865541,1878692,1908448,1930757,1787540,1919711,1845906,1919349,1912264,1836307,1922813,1897222,1800125,1842865,1842881,1844677,1894711,1911570,1926072,1818175'),
		5 => array('cat_id' => '1', 
			'cat_level' => '5', 
			'cat_title' => 'Video Nhật', 
			'cat_short_title' => 'Nhật', 
			'cat_url' => 'j-video', 
			'cat_music' => '0', 
			'cat_order' => '50', 
			'cat_last_hot_song' => '1895983,1835458,1769615,1829795,1835235,1836147,1850841,1873904,1879499,1758356,1860615,1775036,1897410,1930850,1934806,1936836,1827002,1921856,1860343,1907948,1936284,1817168,1766839,1770318,1820042'),
		6 => array('cat_id' => '1', 
			'cat_level' => '6', 
			'cat_title' => 'Video Pháp', 
			'cat_short_title' => 'Pháp', 
			'cat_url' => 'f-video', 
			'cat_music' => '0', 
			'cat_order' => '60', 
			'cat_last_hot_song' => '1919349,1836307,1897222,1800125,1911570,1911431,1933117,1834316,1820066,1847402,1919348,1920743,1939573,1939569,1927261,1890419,1878702,1895798,1836978,1763605,1830137,1846978,1850859,1763977,1785430'),
		7 => array('cat_id' => '1', 
			'cat_level' => '7', 
			'cat_title' => 'Video nước khác', 
			'cat_short_title' => 'Nước khác', 
			'cat_url' => 'o-video', 
			'cat_music' => '0', 
			'cat_order' => '70', 
			'cat_last_hot_song' => '1898164,1866961,1882616'),
		8 => array('cat_id' => '1', 
			'cat_level' => '8', 
			'cat_title' => 'Video Live', 
			'cat_short_title' => 'Live', 
			'cat_url' => 'l-video', 
			'cat_music' => '0', 
			'cat_order' => '80', 
			'cat_last_hot_song' => '1817925,1932204,1921105,1848428,1790241,1831979,1879895,1921127,1809383,1775009,1921725,1853409,1883231,1922922,1922923,1822426,1883089,1938645,1770737,1775011,1780450,1759659,1808203,1856717,1869126'),
		9 => array('cat_id' => '1', 
			'cat_level' => '9', 
			'cat_title' => 'Video Hài', 
			'cat_short_title' => 'Hài', 
			'cat_url' => 'h-video', 
			'cat_music' => '0', 
			'cat_order' => '90', 
			'cat_last_hot_song' => '1916263'),
	),
	2 => array(
		0 => array('cat_id' => '2', 
			'cat_level' => '0', 
			'cat_title' => 'Beat, Playback', 
			'cat_short_title' => 'Playback', 
			'cat_url' => 'beat-playback', 
			'cat_music' => '0', 
			'cat_order' => '20', 
			'cat_last_hot_song' => '211567,264557,338772,1004561,1000012,1000031,1000034,1000035,1000233,1000238,1000239,1000240,1000282,1000283,1000286,1000661,1000693,1001273,1001274,1001275'),
		1 => array('cat_id' => '2', 
			'cat_level' => '1', 
			'cat_title' => 'Playback Việt Nam', 
			'cat_short_title' => 'Việt Nam', 
			'cat_url' => 'v-instrumental', 
			'cat_music' => '0', 
			'cat_order' => '10', 
			'cat_last_hot_song' => '1931971,1936355,1771460,1914772,1897727,1910353,1923950,1918948,1893257,1892468,1802144,1787109,1842659,1851347,1764517,1829369,1836186,1848872,1872320,1932838,1913412,1872162,1882037,1901194,1921011'),
		2 => array('cat_id' => '2', 
			'cat_level' => '2', 
			'cat_title' => 'Playback US-UK', 
			'cat_short_title' => 'US-UK', 
			'cat_url' => 'us-instrumental', 
			'cat_music' => '0', 
			'cat_order' => '20', 
			'cat_last_hot_song' => '1778529,1796822,1869085,1779263,1937292,1937633,1811128,1937035,1825782,1837551,1930150,1810833,1930496,1936985,1934779,1781230,1759081,1827600,1873724,1828954,1790804,1837548,1903331,1821096,1929945'),
		3 => array('cat_id' => '2', 
			'cat_level' => '3', 
			'cat_title' => 'Playback Hoa', 
			'cat_short_title' => 'Hoa', 
			'cat_url' => 'c-instrumental', 
			'cat_music' => '0', 
			'cat_order' => '30', 
			'cat_last_hot_song' => '1917803,1773353,1894849,1920485,1913144,1845067,1866334,1893924,1845077,1893881,1773356,1893896,1893882,1902282,1912598,1919629,1920999,1924208,1924196,1938322,1845076,1875842,1893898,1893879,1893887'),
		4 => array('cat_id' => '2', 
			'cat_level' => '4', 
			'cat_title' => 'Playback Hàn', 
			'cat_short_title' => 'Hàn', 
			'cat_url' => 'k-instrumental', 
			'cat_music' => '0', 
			'cat_order' => '40', 
			'cat_last_hot_song' => '1936321,1934166,1897416,1908931,1846895,1918852,1921641,1781678,1823556,1829919,1916624,1835887,1860668,1924878,1934171,1920462,1860885,1933206,1771375,1754686,1840232,1933211,1871997,1872964,1887609'),
		5 => array('cat_id' => '2', 
			'cat_level' => '5', 
			'cat_title' => 'Playback Nhật', 
			'cat_short_title' => 'Nhật', 
			'cat_url' => 'j-instrumental', 
			'cat_music' => '0', 
			'cat_order' => '50', 
			'cat_last_hot_song' => '1938205,1841732,1910156,1938206,1856915,1772770,1805765,1805779,1841722,1841734,1901361,1938211,1881012,1898228,1880672,1936291,1770956,1798371,1938207,1772891,1783925,1871018,1778744,1892074,1770329'),
		6 => array('cat_id' => '2', 
			'cat_level' => '6', 
			'cat_title' => 'Playback Pháp', 
			'cat_short_title' => 'Pháp', 
			'cat_url' => 'f-instrumental', 
			'cat_music' => '0', 
			'cat_order' => '60', 
			'cat_last_hot_song' => '1837365,1881512,1796373,1837384,1837371,1837373,1837376,1837379,1837381,1837383,1882379,1882664,1917415'),
		7 => array('cat_id' => '2', 
			'cat_level' => '7', 
			'cat_title' => 'Playback nước khác', 
			'cat_short_title' => 'Nước khác', 
			'cat_url' => 'o-instrumental', 
			'cat_music' => '0', 
			'cat_order' => '70', 
			'cat_last_hot_song' => '1828957,1935686,1936413,1870209,1935535,1936415,1784804,1844766,1881145,1936409,1809522,1902139,1918448,1919527,1936432,1784816,1837380,1881151,1881152,1918491,1778774,1778767,1778770,1782715,1766346'),
	),
	3 => array(
		0 => array('cat_id' => '3', 
			'cat_level' => '0', 
			'cat_title' => 'Nhạc Việt Nam', 
			'cat_short_title' => 'Việt Nam', 
			'cat_url' => 'vietnam', 
			'cat_music' => '0', 
			'cat_order' => '30', 
			'cat_last_hot_song' => '1006026,236189,1003790,384996,1006028,1006027,402220,1000371,1000372,1000374,1000373,1000380,1000375,1000381,1001583,228385,228384,228359,228349,228315'),
		1 => array('cat_id' => '3', 
			'cat_level' => '1', 
			'cat_title' => 'Nhạc pop, rock...', 
			'cat_short_title' => 'Pop, rock...', 
			'cat_url' => 'v-pop', 
			'cat_music' => '0', 
			'cat_order' => '10', 
			'cat_last_hot_song' => '1930838,1923949,1932840,1931243,1917766,1906363,1903927,1938526,1897669,1904314,1936298,1933543,1934798,1925066,1904537,1861608,1910687,1859063,1897306,1910270,1924361,1890974,1855083,1882035,1930901'),
		2 => array('cat_id' => '3', 
			'cat_level' => '2', 
			'cat_title' => 'Nhạc rap, hiphop', 
			'cat_short_title' => 'Rap, hiphop', 
			'cat_url' => 'v-rap-hiphop', 
			'cat_music' => '0', 
			'cat_order' => '20', 
			'cat_last_hot_song' => '1938524,1851877,1880060,1923780,1820988,1927858,1931984,1879453,1773435,1870419,1915921,1900851,1770856,1923755,1850232,1910395,1914916,1882420,1787346,1916483,1884915,1773360,1880081,1815795,1929530'),
		3 => array('cat_id' => '3', 
			'cat_level' => '3', 
			'cat_title' => 'Nhạc dance, remix', 
			'cat_short_title' => 'Dance, remix', 
			'cat_url' => 'v-dance-remix', 
			'cat_music' => '0', 
			'cat_order' => '30', 
			'cat_last_hot_song' => '1939477,1812688,1917107,1820506,1841626,1828280,1929493,1830453,1911190,1774971,1921050,1857807,1816001,1856080,1865692,1915095,1859064,1911181,1901412,1919058,1827401,1923037,1917770,1930286,1899062'),
		4 => array('cat_id' => '3', 
			'cat_level' => '4', 
			'cat_title' => 'Nhạc truyền thống', 
			'cat_short_title' => 'Truyền thống', 
			'cat_url' => 'v-truyen-thong', 
			'cat_music' => '0', 
			'cat_order' => '40', 
			'cat_last_hot_song' => '1859295,1859296,1801422,1863446,1801423,1859299,1863454,1859300,1859297,1861042,1882896,1861044,1859298,1854812,1863449,1859294,1882036,1839657,1854811,1863450,1801419,1859301,1938325,1827229,1861043'),
	),
	4 => array(
		0 => array('cat_id' => '4', 
			'cat_level' => '0', 
			'cat_title' => 'Nhạc US-UK', 
			'cat_short_title' => 'US-UK', 
			'cat_url' => 'us-uk', 
			'cat_music' => '0', 
			'cat_order' => '40', 
			'cat_last_hot_song' => '228563,1000009,1000015,1000030,1001347,1000278,1000399,1000548,1000852,1000851,1000734,1001355,1000916,1000917,1000918,1000919,1000920,1000921,1000922,1000923'),
		1 => array('cat_id' => '4', 
			'cat_level' => '1', 
			'cat_title' => 'Nhạc pop, rock...', 
			'cat_short_title' => 'Pop, rock...', 
			'cat_url' => 'us-pop', 
			'cat_music' => '0', 
			'cat_order' => '10', 
			'cat_last_hot_song' => '1938004,1913149,1930881,1930003,1812842,1757811,1905972,1767123,1769847,1937951,1908105,1934628,1918323,1927832,1927642,1844849,1798711,1935062,1900494,1773553,1905974,1837714,1900337,1849739,1897782'),
		2 => array('cat_id' => '4', 
			'cat_level' => '2', 
			'cat_title' => 'Nhạc rap, hiphop', 
			'cat_short_title' => 'Rap, hiphop', 
			'cat_url' => 'us-rap-hiphop', 
			'cat_music' => '0', 
			'cat_order' => '20', 
			'cat_last_hot_song' => '1922797,1935404,1939162,1895994,1878584,1933916,1901883,1902029,1865732,1902040,1936280,1852519,1939115,1783594,1810812,1773717,1922778,1896725,1825661,1925035,1887966,1924979,1780060,1939545,1897911'),
		3 => array('cat_id' => '4', 
			'cat_level' => '3', 
			'cat_title' => 'Nhạc dance, remix', 
			'cat_short_title' => 'Dance, remix', 
			'cat_url' => 'us-dance-remix', 
			'cat_music' => '0', 
			'cat_order' => '30', 
			'cat_last_hot_song' => '1934627,1937460,1938435,1935928,1767877,1937970,1803104,1934753,1906005,1937971,1794767,1918884,1871423,1938289,1761820,1848080,1922416,1847624,1937175,1825604,1803657,1838236,1939707,1766153,1768275'),
	),
	5 => array(
		0 => array('cat_id' => '5', 
			'cat_level' => '0', 
			'cat_title' => 'Nhạc Hoa', 
			'cat_short_title' => 'Nhạc Hoa', 
			'cat_url' => 'chinese', 
			'cat_music' => '0', 
			'cat_order' => '50', 
			'cat_last_hot_song' => '1002898,1002897,1002899,1002900,1002886,1002805,1002806,1002807,1002808,1002809,1002810,1002811,1002813,1002814,1002815,1002816,1002817,1002818,1002819,1002822'),
		1 => array('cat_id' => '5', 
			'cat_level' => '1', 
			'cat_title' => 'Nhạc pop, rock...', 
			'cat_short_title' => 'Pop, rock...', 
			'cat_url' => 'c-pop', 
			'cat_music' => '0', 
			'cat_order' => '10', 
			'cat_last_hot_song' => '1917802,1841697,1913036,1938258,1939059,1845507,1921088,1757627,1938254,1900682,1935411,1934970,1939543,1937992,1937141,1922985,1825217,1919547,1905470,1884853,1935499,1924187,1921200,1919548,1936062'),
		2 => array('cat_id' => '5', 
			'cat_level' => '2', 
			'cat_title' => 'Nhạc rap, hiphop', 
			'cat_short_title' => 'Rap, hiphop', 
			'cat_url' => 'c-rap-hiphop', 
			'cat_music' => '0', 
			'cat_order' => '20', 
			'cat_last_hot_song' => '1865635,1856648,1900314,1931536,1917133,1859417,1912409,1859689,1889588,1809844,1809845,1809843,1810147,1823603,1824948,1829554,1847212,1856647,1883051,1903423,1912410,1912411,1895230,1895231,1910837'),
		3 => array('cat_id' => '5', 
			'cat_level' => '3', 
			'cat_title' => 'Nhạc dance, remix', 
			'cat_short_title' => 'Dance, remix', 
			'cat_url' => 'c-dance-remix', 
			'cat_music' => '0', 
			'cat_order' => '30', 
			'cat_last_hot_song' => '1935944,1846694,1936849,1803348,1935452,1935939,1935592,1935933,1935585,1935591,1929480,1935588,1934700,1936288,1826260,1833333,1929467,1935584,1936838,1850825,1852136,1787056,1826263,1861208,1936289'),
	),
	6 => array(
		0 => array('cat_id' => '6', 
			'cat_level' => '0', 
			'cat_title' => 'Nhạc Hàn', 
			'cat_short_title' => 'Nhạc Hàn', 
			'cat_url' => 'korea', 
			'cat_music' => '0', 
			'cat_order' => '60', 
			'cat_last_hot_song' => '1000202,1000208,1000943,1001224,1001231,1002827,1001841,1001976,1002825,1001642,1001843,1001844,1001845,1001846,1001847,1001848,1001849,1001850,1001852,1001853'),
		1 => array('cat_id' => '6', 
			'cat_level' => '1', 
			'cat_title' => 'Nhạc pop, rock...', 
			'cat_short_title' => 'Pop, rock...', 
			'cat_url' => 'k-pop', 
			'cat_music' => '0', 
			'cat_order' => '10', 
			'cat_last_hot_song' => '1860881,1867160,1936006,1939514,1926140,1929497,1798819,1903993,1897132,1826372,1916971,1923774,1929502,1794124,1930995,1939497,1826384,1807233,1919143,1920598,1777785,1771367,1814369,1843991,1868378'),
		2 => array('cat_id' => '6', 
			'cat_level' => '2', 
			'cat_title' => 'Nhạc rap, hiphop', 
			'cat_short_title' => 'Rap, hiphop', 
			'cat_url' => 'k-rap-hiphop', 
			'cat_music' => '0', 
			'cat_order' => '20', 
			'cat_last_hot_song' => '1919141,1908429,1908430,1731581,1765233,1894622,1908436,1908435,1895199,1771360,1908434,1908433,1908428,1900997,1908437,1731592,1908438,1731587,1731580,1731590,1731589,1908432,1789286,1908431,1731586'),
		3 => array('cat_id' => '6', 
			'cat_level' => '3', 
			'cat_title' => 'Nhạc dance, remix', 
			'cat_short_title' => 'Dance, remix', 
			'cat_url' => 'k-dance-remix', 
			'cat_music' => '0', 
			'cat_order' => '30', 
			'cat_last_hot_song' => '1926577,1937711,1926579,1921637,1919142,1931817,1934168,1931816,1937712,1937715,1926578,1937756,1919144,1911137,1902899,1905989,1917816,1931996,1937713,1908095,1786469,1937714,1897277,1931819,1916623'),
	),
	7 => array(
		0 => array('cat_id' => '7', 
			'cat_level' => '0', 
			'cat_title' => 'Nhạc Nhật', 
			'cat_short_title' => 'Nhạc Nhật', 
			'cat_url' => 'japan', 
			'cat_music' => '0', 
			'cat_order' => '70', 
			'cat_last_hot_song' => '1001189,1003155,1001522,1001544,1001721,1001840,1001872,1001938,1002101,1002476,1002604,1002823,1002824,1003156,1003157,1003159,1003160,1003150,1003154,1003151'),
		1 => array('cat_id' => '7', 
			'cat_level' => '1', 
			'cat_title' => 'Nhạc pop, rock...', 
			'cat_short_title' => 'Pop, rock...', 
			'cat_url' => 'j-pop', 
			'cat_music' => '0', 
			'cat_order' => '10', 
			'cat_last_hot_song' => '1925460,1936829,1937310,1938390,1933429,1915652,1925987,1815132,1923441,1894929,1936831,1907940,1906599,1934525,1877716,1938418,1800297,1926933,1939224,1875996,1936834,1936833,1934526,1868880,1892577'),
		2 => array('cat_id' => '7', 
			'cat_level' => '2', 
			'cat_title' => 'Nhạc rap, hiphop', 
			'cat_short_title' => 'Rap, hiphop', 
			'cat_url' => 'j-rap-hiphop', 
			'cat_music' => '0', 
			'cat_order' => '20', 
			'cat_last_hot_song' => '1894933,1894931,1894934,1894926,1894925,1894928,1866407,1866401,1866402,1796509,1828279,1894924,1866404,1796510,1894923,1894932,1812392,1812393,1812394,1812391,1813914,1812059,1866408,1812054,1812053'),
		3 => array('cat_id' => '7', 
			'cat_level' => '3', 
			'cat_title' => 'Nhạc dance, remix', 
			'cat_short_title' => 'Dance, remix', 
			'cat_url' => 'j-dance-remix', 
			'cat_music' => '0', 
			'cat_order' => '30', 
			'cat_last_hot_song' => '1871976,1897475,1783048,1788406,1905957,1803866,1864567,1910584,1917643,1922888,1821162,1880554,1892365,1898391,1911461,1926587,1929978,1933001,1937968,1939444,1939451,1882067,1921831,1922889,1922895'),
	),
	8 => array(
		0 => array('cat_id' => '8', 
			'cat_level' => '0', 
			'cat_title' => 'Nhạc Pháp', 
			'cat_short_title' => 'Nhạc Pháp', 
			'cat_url' => 'france', 
			'cat_music' => '0', 
			'cat_order' => '80', 
			'cat_last_hot_song' => ''),
		1 => array('cat_id' => '8', 
			'cat_level' => '1', 
			'cat_title' => 'Nhạc pop, rock...', 
			'cat_short_title' => 'Pop, rock...', 
			'cat_url' => 'f-pop', 
			'cat_music' => '0', 
			'cat_order' => '10', 
			'cat_last_hot_song' => '1768974,1918286,1926228,1937085,1937087,1937088,1842537,1937081,1937082,1871217,1815122,1842546,1892587,1937084,1937086,1865464,1777957,1806647,1853246,1853249,1853264,1853276,1917423,1937083,1937089'),
		2 => array('cat_id' => '8', 
			'cat_level' => '2', 
			'cat_title' => 'Nhạc rap, hiphop', 
			'cat_short_title' => 'Rap, hiphop', 
			'cat_url' => 'f-rap-hiphop', 
			'cat_music' => '0', 
			'cat_order' => '20', 
			'cat_last_hot_song' => '1650567,1650552,1650553,1650554,1650555,1650556,1650557,1650558,1650559,1650560,1650561,1650562,1650563,1650564,1650565,1650566,1650568,1650569,1730916,1730939'),
		3 => array('cat_id' => '8', 
			'cat_level' => '3', 
			'cat_title' => 'Nhạc dance, remix', 
			'cat_short_title' => 'Dance, remix', 
			'cat_url' => 'f-dance-remix', 
			'cat_music' => '0', 
			'cat_order' => '30', 
			'cat_last_hot_song' => '1825141'),
	),
	9 => array(
		0 => array('cat_id' => '9', 
			'cat_level' => '0', 
			'cat_title' => 'Nhạc nước khác', 
			'cat_short_title' => 'Nước khác', 
			'cat_url' => 'other', 
			'cat_music' => '0', 
			'cat_order' => '90', 
			'cat_last_hot_song' => ''),
		1 => array('cat_id' => '9', 
			'cat_level' => '1', 
			'cat_title' => 'Nhạc pop, rock...', 
			'cat_short_title' => 'Pop, rock...', 
			'cat_url' => 'o-pop', 
			'cat_music' => '0', 
			'cat_order' => '10', 
			'cat_last_hot_song' => '1803308,1815367,1899788,1906376,1906367,1898131,1916075,1874703,1892932,1905113,1899187,1821407,1922483,1913585,1935935,1886439,1908158,1878532,1874989,1893856,1888116,1826869,1935954,1828721,1857310'),
		2 => array('cat_id' => '9', 
			'cat_level' => '2', 
			'cat_title' => 'Nhạc rap, hiphop', 
			'cat_short_title' => 'Rap, hiphop', 
			'cat_url' => 'o-rap-hiphop', 
			'cat_music' => '0', 
			'cat_order' => '20', 
			'cat_last_hot_song' => '1856211,1773982,1816296,1833002,1929691,1910941,1835683,1828728,1828729,1833396,1835676,1835677,1835678,1835679,1835680,1835681,1835682,1835684,1835685,1835686,1835687,1838243,1838698,1838699,1838700'),
		3 => array('cat_id' => '9', 
			'cat_level' => '3', 
			'cat_title' => 'Nhạc dance, remix', 
			'cat_short_title' => 'Dance, remix', 
			'cat_url' => 'o-dance-remix', 
			'cat_music' => '0', 
			'cat_order' => '30', 
			'cat_last_hot_song' => '1813622,1861174,1919268,1861168,1861171,1928573,1815442,1865745,1828712,1926249,1856724,1900481,1867599,1773589,1907662,1785715,1861167,1809848,1830217,1861169,1815570,1808581,1828717,1915529,1828714'),
	),
);

$cat_url2info = array(
	'video' => array('cat_id' => '1', 
			'cat_level' => '0', 
			'cat_title' => 'Video Clip', 
			'cat_short_title' => 'Video Clip', 
			'cat_url' => 'video', 
			'cat_music' => '0', 
			'cat_order' => '10', 
			'cat_last_hot_song' => '1001394,1000456,1000368,1000457,1000455,401902,400087,1000002,1000006,1000010'),
	'v-video' => array('cat_id' => '1', 
			'cat_level' => '1', 
			'cat_title' => 'Video Việt Nam', 
			'cat_short_title' => 'Việt Nam', 
			'cat_url' => 'v-video', 
			'cat_music' => '0', 
			'cat_order' => '10', 
			'cat_last_hot_song' => '1937309,1936640,1926295,1933328,1938078,1926297,1926462,1930241,1933941,1791676,1767409,1938080,1939077,1817925,1930880,1932204,1906381,1780520,1777301,1792156,1936678,1905235,1798668,1935414,1935920'),
	'us-video' => array('cat_id' => '1', 
			'cat_level' => '2', 
			'cat_title' => 'Video US-UK', 
			'cat_short_title' => 'US-UK', 
			'cat_url' => 'us-video', 
			'cat_music' => '0', 
			'cat_order' => '20', 
			'cat_last_hot_song' => '1829164,1937279,1929110,1770878,1913304,1886195,1913254,1931012,1825875,1838299,1908789,1929169,1820040,1766417,1929105,1936455,1906319,1796440,1924926,1780816,1781658,1803486,1824261,1838617,1864784'),
	'c-video' => array('cat_id' => '1', 
			'cat_level' => '3', 
			'cat_title' => 'Video Hoa', 
			'cat_short_title' => 'Hoa', 
			'cat_url' => 'c-video', 
			'cat_music' => '0', 
			'cat_order' => '30', 
			'cat_last_hot_song' => '1817881,1896207,1817880,1827059,1896206,1817232,1760039,1783271,1756299,1758548,1764380,1764576,1764577,1764579,1764580,1764581,1764582,1764585,1764587,1764591,1764590,1781146,1793635,1804289,1793636'),
	'k-video' => array('cat_id' => '1', 
			'cat_level' => '4', 
			'cat_title' => 'Video Hàn', 
			'cat_short_title' => 'Hàn', 
			'cat_url' => 'k-video', 
			'cat_music' => '0', 
			'cat_order' => '40', 
			'cat_last_hot_song' => '1937727,1919140,1781680,1940037,1934851,1865541,1878692,1908448,1930757,1787540,1919711,1845906,1919349,1912264,1836307,1922813,1897222,1800125,1842865,1842881,1844677,1894711,1911570,1926072,1818175'),
	'j-video' => array('cat_id' => '1', 
			'cat_level' => '5', 
			'cat_title' => 'Video Nhật', 
			'cat_short_title' => 'Nhật', 
			'cat_url' => 'j-video', 
			'cat_music' => '0', 
			'cat_order' => '50', 
			'cat_last_hot_song' => '1895983,1835458,1769615,1829795,1835235,1836147,1850841,1873904,1879499,1758356,1860615,1775036,1897410,1930850,1934806,1936836,1827002,1921856,1860343,1907948,1936284,1817168,1766839,1770318,1820042'),
	'f-video' => array('cat_id' => '1', 
			'cat_level' => '6', 
			'cat_title' => 'Video Pháp', 
			'cat_short_title' => 'Pháp', 
			'cat_url' => 'f-video', 
			'cat_music' => '0', 
			'cat_order' => '60', 
			'cat_last_hot_song' => '1919349,1836307,1897222,1800125,1911570,1911431,1933117,1834316,1820066,1847402,1919348,1920743,1939573,1939569,1927261,1890419,1878702,1895798,1836978,1763605,1830137,1846978,1850859,1763977,1785430'),
	'o-video' => array('cat_id' => '1', 
			'cat_level' => '7', 
			'cat_title' => 'Video nước khác', 
			'cat_short_title' => 'Nước khác', 
			'cat_url' => 'o-video', 
			'cat_music' => '0', 
			'cat_order' => '70', 
			'cat_last_hot_song' => '1898164,1866961,1882616'),
	'l-video' => array('cat_id' => '1', 
			'cat_level' => '8', 
			'cat_title' => 'Video Live', 
			'cat_short_title' => 'Live', 
			'cat_url' => 'l-video', 
			'cat_music' => '0', 
			'cat_order' => '80', 
			'cat_last_hot_song' => '1817925,1932204,1921105,1848428,1790241,1831979,1879895,1921127,1809383,1775009,1921725,1853409,1883231,1922922,1922923,1822426,1883089,1938645,1770737,1775011,1780450,1759659,1808203,1856717,1869126'),
	'h-video' => array('cat_id' => '1', 
			'cat_level' => '9', 
			'cat_title' => 'Video Hài', 
			'cat_short_title' => 'Hài', 
			'cat_url' => 'h-video', 
			'cat_music' => '0', 
			'cat_order' => '90', 
			'cat_last_hot_song' => '1916263'),
	'beat-playback' => array('cat_id' => '2', 
			'cat_level' => '0', 
			'cat_title' => 'Beat, Playback', 
			'cat_short_title' => 'Playback', 
			'cat_url' => 'beat-playback', 
			'cat_music' => '0', 
			'cat_order' => '20', 
			'cat_last_hot_song' => '211567,264557,338772,1004561,1000012,1000031,1000034,1000035,1000233,1000238,1000239,1000240,1000282,1000283,1000286,1000661,1000693,1001273,1001274,1001275'),
	'v-instrumental' => array('cat_id' => '2', 
			'cat_level' => '1', 
			'cat_title' => 'Playback Việt Nam', 
			'cat_short_title' => 'Việt Nam', 
			'cat_url' => 'v-instrumental', 
			'cat_music' => '0', 
			'cat_order' => '10', 
			'cat_last_hot_song' => '1931971,1936355,1771460,1914772,1897727,1910353,1923950,1918948,1893257,1892468,1802144,1787109,1842659,1851347,1764517,1829369,1836186,1848872,1872320,1932838,1913412,1872162,1882037,1901194,1921011'),
	'us-instrumental' => array('cat_id' => '2', 
			'cat_level' => '2', 
			'cat_title' => 'Playback US-UK', 
			'cat_short_title' => 'US-UK', 
			'cat_url' => 'us-instrumental', 
			'cat_music' => '0', 
			'cat_order' => '20', 
			'cat_last_hot_song' => '1778529,1796822,1869085,1779263,1937292,1937633,1811128,1937035,1825782,1837551,1930150,1810833,1930496,1936985,1934779,1781230,1759081,1827600,1873724,1828954,1790804,1837548,1903331,1821096,1929945'),
	'c-instrumental' => array('cat_id' => '2', 
			'cat_level' => '3', 
			'cat_title' => 'Playback Hoa', 
			'cat_short_title' => 'Hoa', 
			'cat_url' => 'c-instrumental', 
			'cat_music' => '0', 
			'cat_order' => '30', 
			'cat_last_hot_song' => '1917803,1773353,1894849,1920485,1913144,1845067,1866334,1893924,1845077,1893881,1773356,1893896,1893882,1902282,1912598,1919629,1920999,1924208,1924196,1938322,1845076,1875842,1893898,1893879,1893887'),
	'k-instrumental' => array('cat_id' => '2', 
			'cat_level' => '4', 
			'cat_title' => 'Playback Hàn', 
			'cat_short_title' => 'Hàn', 
			'cat_url' => 'k-instrumental', 
			'cat_music' => '0', 
			'cat_order' => '40', 
			'cat_last_hot_song' => '1936321,1934166,1897416,1908931,1846895,1918852,1921641,1781678,1823556,1829919,1916624,1835887,1860668,1924878,1934171,1920462,1860885,1933206,1771375,1754686,1840232,1933211,1871997,1872964,1887609'),
	'j-instrumental' => array('cat_id' => '2', 
			'cat_level' => '5', 
			'cat_title' => 'Playback Nhật', 
			'cat_short_title' => 'Nhật', 
			'cat_url' => 'j-instrumental', 
			'cat_music' => '0', 
			'cat_order' => '50', 
			'cat_last_hot_song' => '1938205,1841732,1910156,1938206,1856915,1772770,1805765,1805779,1841722,1841734,1901361,1938211,1881012,1898228,1880672,1936291,1770956,1798371,1938207,1772891,1783925,1871018,1778744,1892074,1770329'),
	'f-instrumental' => array('cat_id' => '2', 
			'cat_level' => '6', 
			'cat_title' => 'Playback Pháp', 
			'cat_short_title' => 'Pháp', 
			'cat_url' => 'f-instrumental', 
			'cat_music' => '0', 
			'cat_order' => '60', 
			'cat_last_hot_song' => '1837365,1881512,1796373,1837384,1837371,1837373,1837376,1837379,1837381,1837383,1882379,1882664,1917415'),
	'o-instrumental' => array('cat_id' => '2', 
			'cat_level' => '7', 
			'cat_title' => 'Playback nước khác', 
			'cat_short_title' => 'Nước khác', 
			'cat_url' => 'o-instrumental', 
			'cat_music' => '0', 
			'cat_order' => '70', 
			'cat_last_hot_song' => '1828957,1935686,1936413,1870209,1935535,1936415,1784804,1844766,1881145,1936409,1809522,1902139,1918448,1919527,1936432,1784816,1837380,1881151,1881152,1918491,1778774,1778767,1778770,1782715,1766346'),
	'vietnam' => array('cat_id' => '3', 
			'cat_level' => '0', 
			'cat_title' => 'Nhạc Việt Nam', 
			'cat_short_title' => 'Việt Nam', 
			'cat_url' => 'vietnam', 
			'cat_music' => '0', 
			'cat_order' => '30', 
			'cat_last_hot_song' => '1006026,236189,1003790,384996,1006028,1006027,402220,1000371,1000372,1000374,1000373,1000380,1000375,1000381,1001583,228385,228384,228359,228349,228315'),
	'v-pop' => array('cat_id' => '3', 
			'cat_level' => '1', 
			'cat_title' => 'Nhạc pop, rock...', 
			'cat_short_title' => 'Pop, rock...', 
			'cat_url' => 'v-pop', 
			'cat_music' => '0', 
			'cat_order' => '10', 
			'cat_last_hot_song' => '1930838,1923949,1932840,1931243,1917766,1906363,1903927,1938526,1897669,1904314,1936298,1933543,1934798,1925066,1904537,1861608,1910687,1859063,1897306,1910270,1924361,1890974,1855083,1882035,1930901'),
	'v-rap-hiphop' => array('cat_id' => '3', 
			'cat_level' => '2', 
			'cat_title' => 'Nhạc rap, hiphop', 
			'cat_short_title' => 'Rap, hiphop', 
			'cat_url' => 'v-rap-hiphop', 
			'cat_music' => '0', 
			'cat_order' => '20', 
			'cat_last_hot_song' => '1938524,1851877,1880060,1923780,1820988,1927858,1931984,1879453,1773435,1870419,1915921,1900851,1770856,1923755,1850232,1910395,1914916,1882420,1787346,1916483,1884915,1773360,1880081,1815795,1929530'),
	'v-dance-remix' => array('cat_id' => '3', 
			'cat_level' => '3', 
			'cat_title' => 'Nhạc dance, remix', 
			'cat_short_title' => 'Dance, remix', 
			'cat_url' => 'v-dance-remix', 
			'cat_music' => '0', 
			'cat_order' => '30', 
			'cat_last_hot_song' => '1939477,1812688,1917107,1820506,1841626,1828280,1929493,1830453,1911190,1774971,1921050,1857807,1816001,1856080,1865692,1915095,1859064,1911181,1901412,1919058,1827401,1923037,1917770,1930286,1899062'),
	'v-truyen-thong' => array('cat_id' => '3', 
			'cat_level' => '4', 
			'cat_title' => 'Nhạc truyền thống', 
			'cat_short_title' => 'Truyền thống', 
			'cat_url' => 'v-truyen-thong', 
			'cat_music' => '0', 
			'cat_order' => '40', 
			'cat_last_hot_song' => '1859295,1859296,1801422,1863446,1801423,1859299,1863454,1859300,1859297,1861042,1882896,1861044,1859298,1854812,1863449,1859294,1882036,1839657,1854811,1863450,1801419,1859301,1938325,1827229,1861043'),
	'us-uk' => array('cat_id' => '4', 
			'cat_level' => '0', 
			'cat_title' => 'Nhạc US-UK', 
			'cat_short_title' => 'US-UK', 
			'cat_url' => 'us-uk', 
			'cat_music' => '0', 
			'cat_order' => '40', 
			'cat_last_hot_song' => '228563,1000009,1000015,1000030,1001347,1000278,1000399,1000548,1000852,1000851,1000734,1001355,1000916,1000917,1000918,1000919,1000920,1000921,1000922,1000923'),
	'us-pop' => array('cat_id' => '4', 
			'cat_level' => '1', 
			'cat_title' => 'Nhạc pop, rock...', 
			'cat_short_title' => 'Pop, rock...', 
			'cat_url' => 'us-pop', 
			'cat_music' => '0', 
			'cat_order' => '10', 
			'cat_last_hot_song' => '1938004,1913149,1930881,1930003,1812842,1757811,1905972,1767123,1769847,1937951,1908105,1934628,1918323,1927832,1927642,1844849,1798711,1935062,1900494,1773553,1905974,1837714,1900337,1849739,1897782'),
	'us-rap-hiphop' => array('cat_id' => '4', 
			'cat_level' => '2', 
			'cat_title' => 'Nhạc rap, hiphop', 
			'cat_short_title' => 'Rap, hiphop', 
			'cat_url' => 'us-rap-hiphop', 
			'cat_music' => '0', 
			'cat_order' => '20', 
			'cat_last_hot_song' => '1922797,1935404,1939162,1895994,1878584,1933916,1901883,1902029,1865732,1902040,1936280,1852519,1939115,1783594,1810812,1773717,1922778,1896725,1825661,1925035,1887966,1924979,1780060,1939545,1897911'),
	'us-dance-remix' => array('cat_id' => '4', 
			'cat_level' => '3', 
			'cat_title' => 'Nhạc dance, remix', 
			'cat_short_title' => 'Dance, remix', 
			'cat_url' => 'us-dance-remix', 
			'cat_music' => '0', 
			'cat_order' => '30', 
			'cat_last_hot_song' => '1934627,1937460,1938435,1935928,1767877,1937970,1803104,1934753,1906005,1937971,1794767,1918884,1871423,1938289,1761820,1848080,1922416,1847624,1937175,1825604,1803657,1838236,1939707,1766153,1768275'),
	'chinese' => array('cat_id' => '5', 
			'cat_level' => '0', 
			'cat_title' => 'Nhạc Hoa', 
			'cat_short_title' => 'Nhạc Hoa', 
			'cat_url' => 'chinese', 
			'cat_music' => '0', 
			'cat_order' => '50', 
			'cat_last_hot_song' => '1002898,1002897,1002899,1002900,1002886,1002805,1002806,1002807,1002808,1002809,1002810,1002811,1002813,1002814,1002815,1002816,1002817,1002818,1002819,1002822'),
	'c-pop' => array('cat_id' => '5', 
			'cat_level' => '1', 
			'cat_title' => 'Nhạc pop, rock...', 
			'cat_short_title' => 'Pop, rock...', 
			'cat_url' => 'c-pop', 
			'cat_music' => '0', 
			'cat_order' => '10', 
			'cat_last_hot_song' => '1917802,1841697,1913036,1938258,1939059,1845507,1921088,1757627,1938254,1900682,1935411,1934970,1939543,1937992,1937141,1922985,1825217,1919547,1905470,1884853,1935499,1924187,1921200,1919548,1936062'),
	'c-rap-hiphop' => array('cat_id' => '5', 
			'cat_level' => '2', 
			'cat_title' => 'Nhạc rap, hiphop', 
			'cat_short_title' => 'Rap, hiphop', 
			'cat_url' => 'c-rap-hiphop', 
			'cat_music' => '0', 
			'cat_order' => '20', 
			'cat_last_hot_song' => '1865635,1856648,1900314,1931536,1917133,1859417,1912409,1859689,1889588,1809844,1809845,1809843,1810147,1823603,1824948,1829554,1847212,1856647,1883051,1903423,1912410,1912411,1895230,1895231,1910837'),
	'c-dance-remix' => array('cat_id' => '5', 
			'cat_level' => '3', 
			'cat_title' => 'Nhạc dance, remix', 
			'cat_short_title' => 'Dance, remix', 
			'cat_url' => 'c-dance-remix', 
			'cat_music' => '0', 
			'cat_order' => '30', 
			'cat_last_hot_song' => '1935944,1846694,1936849,1803348,1935452,1935939,1935592,1935933,1935585,1935591,1929480,1935588,1934700,1936288,1826260,1833333,1929467,1935584,1936838,1850825,1852136,1787056,1826263,1861208,1936289'),
	'korea' => array('cat_id' => '6', 
			'cat_level' => '0', 
			'cat_title' => 'Nhạc Hàn', 
			'cat_short_title' => 'Nhạc Hàn', 
			'cat_url' => 'korea', 
			'cat_music' => '0', 
			'cat_order' => '60', 
			'cat_last_hot_song' => '1000202,1000208,1000943,1001224,1001231,1002827,1001841,1001976,1002825,1001642,1001843,1001844,1001845,1001846,1001847,1001848,1001849,1001850,1001852,1001853'),
	'k-pop' => array('cat_id' => '6', 
			'cat_level' => '1', 
			'cat_title' => 'Nhạc pop, rock...', 
			'cat_short_title' => 'Pop, rock...', 
			'cat_url' => 'k-pop', 
			'cat_music' => '0', 
			'cat_order' => '10', 
			'cat_last_hot_song' => '1860881,1867160,1936006,1939514,1926140,1929497,1798819,1903993,1897132,1826372,1916971,1923774,1929502,1794124,1930995,1939497,1826384,1807233,1919143,1920598,1777785,1771367,1814369,1843991,1868378'),
	'k-rap-hiphop' => array('cat_id' => '6', 
			'cat_level' => '2', 
			'cat_title' => 'Nhạc rap, hiphop', 
			'cat_short_title' => 'Rap, hiphop', 
			'cat_url' => 'k-rap-hiphop', 
			'cat_music' => '0', 
			'cat_order' => '20', 
			'cat_last_hot_song' => '1919141,1908429,1908430,1731581,1765233,1894622,1908436,1908435,1895199,1771360,1908434,1908433,1908428,1900997,1908437,1731592,1908438,1731587,1731580,1731590,1731589,1908432,1789286,1908431,1731586'),
	'k-dance-remix' => array('cat_id' => '6', 
			'cat_level' => '3', 
			'cat_title' => 'Nhạc dance, remix', 
			'cat_short_title' => 'Dance, remix', 
			'cat_url' => 'k-dance-remix', 
			'cat_music' => '0', 
			'cat_order' => '30', 
			'cat_last_hot_song' => '1926577,1937711,1926579,1921637,1919142,1931817,1934168,1931816,1937712,1937715,1926578,1937756,1919144,1911137,1902899,1905989,1917816,1931996,1937713,1908095,1786469,1937714,1897277,1931819,1916623'),
	'japan' => array('cat_id' => '7', 
			'cat_level' => '0', 
			'cat_title' => 'Nhạc Nhật', 
			'cat_short_title' => 'Nhạc Nhật', 
			'cat_url' => 'japan', 
			'cat_music' => '0', 
			'cat_order' => '70', 
			'cat_last_hot_song' => '1001189,1003155,1001522,1001544,1001721,1001840,1001872,1001938,1002101,1002476,1002604,1002823,1002824,1003156,1003157,1003159,1003160,1003150,1003154,1003151'),
	'j-pop' => array('cat_id' => '7', 
			'cat_level' => '1', 
			'cat_title' => 'Nhạc pop, rock...', 
			'cat_short_title' => 'Pop, rock...', 
			'cat_url' => 'j-pop', 
			'cat_music' => '0', 
			'cat_order' => '10', 
			'cat_last_hot_song' => '1925460,1936829,1937310,1938390,1933429,1915652,1925987,1815132,1923441,1894929,1936831,1907940,1906599,1934525,1877716,1938418,1800297,1926933,1939224,1875996,1936834,1936833,1934526,1868880,1892577'),
	'j-rap-hiphop' => array('cat_id' => '7', 
			'cat_level' => '2', 
			'cat_title' => 'Nhạc rap, hiphop', 
			'cat_short_title' => 'Rap, hiphop', 
			'cat_url' => 'j-rap-hiphop', 
			'cat_music' => '0', 
			'cat_order' => '20', 
			'cat_last_hot_song' => '1894933,1894931,1894934,1894926,1894925,1894928,1866407,1866401,1866402,1796509,1828279,1894924,1866404,1796510,1894923,1894932,1812392,1812393,1812394,1812391,1813914,1812059,1866408,1812054,1812053'),
	'j-dance-remix' => array('cat_id' => '7', 
			'cat_level' => '3', 
			'cat_title' => 'Nhạc dance, remix', 
			'cat_short_title' => 'Dance, remix', 
			'cat_url' => 'j-dance-remix', 
			'cat_music' => '0', 
			'cat_order' => '30', 
			'cat_last_hot_song' => '1871976,1897475,1783048,1788406,1905957,1803866,1864567,1910584,1917643,1922888,1821162,1880554,1892365,1898391,1911461,1926587,1929978,1933001,1937968,1939444,1939451,1882067,1921831,1922889,1922895'),
	'france' => array('cat_id' => '8', 
			'cat_level' => '0', 
			'cat_title' => 'Nhạc Pháp', 
			'cat_short_title' => 'Nhạc Pháp', 
			'cat_url' => 'france', 
			'cat_music' => '0', 
			'cat_order' => '80', 
			'cat_last_hot_song' => ''),
	'f-pop' => array('cat_id' => '8', 
			'cat_level' => '1', 
			'cat_title' => 'Nhạc pop, rock...', 
			'cat_short_title' => 'Pop, rock...', 
			'cat_url' => 'f-pop', 
			'cat_music' => '0', 
			'cat_order' => '10', 
			'cat_last_hot_song' => '1768974,1918286,1926228,1937085,1937087,1937088,1842537,1937081,1937082,1871217,1815122,1842546,1892587,1937084,1937086,1865464,1777957,1806647,1853246,1853249,1853264,1853276,1917423,1937083,1937089'),
	'f-rap-hiphop' => array('cat_id' => '8', 
			'cat_level' => '2', 
			'cat_title' => 'Nhạc rap, hiphop', 
			'cat_short_title' => 'Rap, hiphop', 
			'cat_url' => 'f-rap-hiphop', 
			'cat_music' => '0', 
			'cat_order' => '20', 
			'cat_last_hot_song' => '1650567,1650552,1650553,1650554,1650555,1650556,1650557,1650558,1650559,1650560,1650561,1650562,1650563,1650564,1650565,1650566,1650568,1650569,1730916,1730939'),
	'f-dance-remix' => array('cat_id' => '8', 
			'cat_level' => '3', 
			'cat_title' => 'Nhạc dance, remix', 
			'cat_short_title' => 'Dance, remix', 
			'cat_url' => 'f-dance-remix', 
			'cat_music' => '0', 
			'cat_order' => '30', 
			'cat_last_hot_song' => '1825141'),
	'other' => array('cat_id' => '9', 
			'cat_level' => '0', 
			'cat_title' => 'Nhạc nước khác', 
			'cat_short_title' => 'Nước khác', 
			'cat_url' => 'other', 
			'cat_music' => '0', 
			'cat_order' => '90', 
			'cat_last_hot_song' => ''),
	'o-pop' => array('cat_id' => '9', 
			'cat_level' => '1', 
			'cat_title' => 'Nhạc pop, rock...', 
			'cat_short_title' => 'Pop, rock...', 
			'cat_url' => 'o-pop', 
			'cat_music' => '0', 
			'cat_order' => '10', 
			'cat_last_hot_song' => '1803308,1815367,1899788,1906376,1906367,1898131,1916075,1874703,1892932,1905113,1899187,1821407,1922483,1913585,1935935,1886439,1908158,1878532,1874989,1893856,1888116,1826869,1935954,1828721,1857310'),
	'o-rap-hiphop' => array('cat_id' => '9', 
			'cat_level' => '2', 
			'cat_title' => 'Nhạc rap, hiphop', 
			'cat_short_title' => 'Rap, hiphop', 
			'cat_url' => 'o-rap-hiphop', 
			'cat_music' => '0', 
			'cat_order' => '20', 
			'cat_last_hot_song' => '1856211,1773982,1816296,1833002,1929691,1910941,1835683,1828728,1828729,1833396,1835676,1835677,1835678,1835679,1835680,1835681,1835682,1835684,1835685,1835686,1835687,1838243,1838698,1838699,1838700'),
	'o-dance-remix' => array('cat_id' => '9', 
			'cat_level' => '3', 
			'cat_title' => 'Nhạc dance, remix', 
			'cat_short_title' => 'Dance, remix', 
			'cat_url' => 'o-dance-remix', 
			'cat_music' => '0', 
			'cat_order' => '30', 
			'cat_last_hot_song' => '1813622,1861174,1919268,1861168,1861171,1928573,1815442,1865745,1828712,1926249,1856724,1900481,1867599,1773589,1907662,1785715,1861167,1809848,1830217,1861169,1815570,1808581,1828717,1915529,1828714'),
);


?>