/**
 * The proof behind the Results section: public counts from the Green Thumb
 * Depot YouTube channel and Instagram account.
 *
 * Nothing here comes from YouTube Studio or Instagram Insights, so anyone can
 * check a row by opening the post. To refresh, re-pull the counts, replace the
 * rows and bump the two MEASURED dates; the section recomputes every headline
 * number from these arrays, so no sentence needs editing by hand.
 */

export type ChannelVideo = {
  id: string
  title: string
  /** Publish date, YYYY-MM-DD. */
  date: string
  /** Exact public view count on the YOUTUBE_MEASURED date. */
  views: number
  seconds: number
}

export type Reel = {
  /** instagram.com/p/<code>/ */
  code: string
  /** First line of the caption. */
  caption: string
  date: string
  /** Instagram's public play count on the INSTAGRAM_MEASURED date. */
  plays: number
}

export const YOUTUBE_MEASURED = "2026-10-10"
export const INSTAGRAM_MEASURED = "2026-09-28"

/** First upload after I picked the channel up. Everything on or after this is mine. */
export const TAKEOVER = "2026-06-24"

/** Shorts published on the channel since TAKEOVER, counted on YOUTUBE_MEASURED. */
export const SHORTS_SHIPPED = 74

/** Followers on the Instagram account on INSTAGRAM_MEASURED. */
export const INSTAGRAM_FOLLOWERS = 1848

/** Every long-form video on the channel, oldest first. */
export const channelVideos: ChannelVideo[] = [
  { id: "dzoefUIbCG0", title: "FOHSE LED Grow Lights - An Interview with Justin Rider Director of Sales with FOHSE", date: "2024-02-29", views: 2420, seconds: 1232 },
  { id: "Tjaaq6OWLVg", title: "EZ Trim - An Interview with Founder, Joe Black", date: "2024-03-14", views: 2600, seconds: 1953 },
  { id: "Ou0vN7doyqU", title: "STM Canna - An interview with Channel Partner, Adam Wick", date: "2024-03-18", views: 1370, seconds: 1812 },
  { id: "4AyUqNzOHVs", title: "Holland Green Science - An Interview with Founder, Michael Urosev", date: "2024-03-19", views: 1423, seconds: 2092 },
  { id: "nDeI45hnoE8", title: "GreenBroz - An Interview with GreenBroz, Tim Strombel", date: "2024-03-31", views: 1382, seconds: 2171 },
  { id: "SwJJz5Uno0Q", title: "Black Dog LED - An Interview with Justin Aarestad Head of Sales", date: "2024-04-02", views: 1211, seconds: 1530 },
  { id: "mnkvyA8OnOE", title: "Alien Hydroponics - An interview with Noah Miller, Alien's sole US Distribution Partner", date: "2024-04-02", views: 1424, seconds: 1935 },
  { id: "SqW6styHmqA", title: "Matrix - An Interview with Sean Bejarano, Director of Sales at Matrix", date: "2024-06-21", views: 1187, seconds: 892 },
  { id: "ILu_I_N9SK4", title: "Flexstar - An Interview with Sean Bejarano, Director of Sales at FlexStar", date: "2024-06-21", views: 1301, seconds: 1241 },
  { id: "0skfHAy58bo", title: "How to Get a Cannabis License in Washington", date: "2024-07-19", views: 1740, seconds: 1297 },
  { id: "HnB3OKtd8Tg", title: "How to get a cannabis license in New Mexico", date: "2024-07-21", views: 1594, seconds: 1356 },
  { id: "S73mUyh0qDM", title: "Across International - An Interview with Maxwell Dubin, Director of Business at Across International", date: "2024-07-25", views: 1271, seconds: 2697 },
  { id: "cdjVsYgdNPE", title: "Munch Machine - An Interview with Matt Beechinor, Co-Founder of Munch Machine", date: "2024-07-29", views: 1263, seconds: 2029 },
  { id: "SBApV4-Ms9M", title: "Innovative Solutions (ProGuard) - An Interview with Mike D'Ambra, Co-founder and CEO.", date: "2024-08-11", views: 178, seconds: 1833 },
  { id: "nw48ans1foY", title: "How to get a cannabis license in Nevada", date: "2024-09-13", views: 95, seconds: 1142 },
  { id: "LZ-ZUhfccCA", title: "Current Culture - An interview with TC, Current Culture's Commercial Accounts Manager", date: "2025-03-22", views: 41, seconds: 1251 },
  { id: "ykT3qSd38qY", title: "Health Cannabis Company - An interview with Austin Duer of HCC", date: "2025-03-31", views: 57, seconds: 832 },
  { id: "MUMv5LdgsmA", title: "Growee - An interview with Idan Avitan, Growee's CEO & Founder", date: "2025-05-23", views: 216, seconds: 1259 },
  { id: "ZJ1reLCAXAs", title: "Twister Technologies (Keirton) - An Interview with Luke Burmeister, Twister's Head of Sales", date: "2025-07-11", views: 66, seconds: 2888 },
  { id: "CDwC-DCrpp0", title: "Twister Technologies (Keirton) T4 Trimmer", date: "2025-07-16", views: 44, seconds: 256 },
  { id: "DLaRippxbJQ", title: "Twister Technologies (Keirton) Batch One Trimmer", date: "2025-07-16", views: 777, seconds: 281 },
  { id: "TbcFMaLfVBU", title: "Twister Technologies (Keirton) Cure Puck", date: "2025-07-16", views: 711, seconds: 318 },
  { id: "WOwZxscHMZo", title: "Twister Technologies (Keirton) T-Zero Trimmer", date: "2025-07-16", views: 76, seconds: 406 },
  { id: "YDzESXaLt6o", title: "Twister Technologies (Keirton) B4 Bucker", date: "2025-07-16", views: 129, seconds: 250 },
  { id: "_GCB4ytQ8Rs", title: "Twister Technologies (Keirton) T2 Trimmer", date: "2025-07-16", views: 301, seconds: 109 },
  { id: "_pKeI4IMaH8", title: "Twister Technologies (Keirton) T6 Trimmer", date: "2025-07-16", views: 79, seconds: 138 },
  { id: "giSylBiWsLI", title: "Scynce LED Grow Lights - An Interview with Greg Selby, Scynce's Director of Cultivation", date: "2025-07-25", views: 89, seconds: 1699 },
  { id: "iYriP706DOU", title: "Scynce LED Grow Lights Dragon Alpha II and Alpha III", date: "2025-07-25", views: 149, seconds: 122 },
  { id: "s5vfJE2IRdc", title: "Scynce LED Grow Lights Grow Lights Overview", date: "2025-07-25", views: 85, seconds: 271 },
  { id: "uZM-zVOKR3U", title: "Scynce LED Grow Lights Raging Kale II", date: "2025-07-25", views: 221, seconds: 177 },
  { id: "KClBQG6AkE4", title: "Scynce LED Grow Lights Raging Kush II 70° vs 120°", date: "2025-07-25", views: 396, seconds: 121 },
  { id: "2-dVvWGsVSY", title: "TrolMaster - An Interview with Caroline Wynne, Executive VP of Sales and Business Development", date: "2025-08-22", views: 35, seconds: 1525 },
  { id: "4UB9uY2urdM", title: "TrolMaster Hydro-X and Hydro-X Pro Environment Control System Differences", date: "2025-08-28", views: 182, seconds: 47 },
  { id: "EXDtdMQQeQY", title: "TrolMaster Aqua-X Irrigation Control System", date: "2025-08-28", views: 164, seconds: 78 },
  { id: "s62TqO41cyI", title: "TrolMaster Carbon-X CO2 System", date: "2025-08-28", views: 103, seconds: 175 },
  { id: "2xRFVK8FIbc", title: "TrolMaster Hydro-X Environment Control System", date: "2025-08-28", views: 116, seconds: 128 },
  { id: "p1F00owPft4", title: "TrolMaster Controllers and Sensors Overview", date: "2025-08-28", views: 28, seconds: 128 },
  { id: "m0ATtkzCaZc", title: "Commercial Grow Room Setup: The Tent Mistake Killing Your Yield", date: "2026-06-24", views: 345, seconds: 967 },
  { id: "zX5OwcsftQs", title: "Rolling Benches Explained: How to add 30 to 50% More Canopy", date: "2026-07-01", views: 1589, seconds: 1281 },
  { id: "ePOQ004o4SY", title: "How to Size a Grow Room Dehumidifier (Most Growers Get It Wrong)", date: "2026-07-08", views: 272, seconds: 1853 },
  { id: "karHvoZ19f8", title: "How To Actually Size A Dehumidifier For Your Grow Room", date: "2026-07-14", views: 450, seconds: 490 },
  { id: "rlE5ztiu-Vk", title: "27 Years In The Grow Industry: What Actually Changed", date: "2026-07-15", views: 290, seconds: 1769 },
  { id: "uL54ooUx544", title: "How to Pick the Right Grow Light: LED, HPS & More", date: "2026-07-22", views: 271, seconds: 1901 },
  { id: "5HOy_GSMXeI", title: "Grow Light Rebates Explained: $60,000 of Lights for $15,000", date: "2026-07-24", views: 63, seconds: 253 },
  { id: "UtkPFkbuQA4", title: "Grow Media Explained: The 9 Things That Decide Your Yield", date: "2026-07-29", views: 1499, seconds: 1650 },
  { id: "RfkT84nevDM", title: "Why Rockwool? The Growing Media Invented By Accident", date: "2026-08-03", views: 88, seconds: 305 },
  { id: "5sjcUP50pCQ", title: "Why Coco Coir? Loose Vs Compressed, And Why You Flush", date: "2026-08-04", views: 270, seconds: 365 },
  { id: "lvIDvTABwq8", title: "Crop Steering Explained: Dryback, EC and Shot Size", date: "2026-08-05", views: 10461, seconds: 3104 },
  { id: "2iLTZk4Zy3M", title: "Pre-Roll Machines Explained with STM Canna: How To Cut A 14 Person Line To 6", date: "2026-08-12", views: 195, seconds: 3168 },
  { id: "enzjtxjHln4", title: "Everybody's Crop Steering. Most Just Don't Know Where They're Going", date: "2026-08-13", views: 321, seconds: 369 },
  { id: "CYE15-TtZAk", title: "How To Stack EC Without Shutting The Plant Down", date: "2026-08-17", views: 1925, seconds: 367 },
  { id: "-69BJuGoxVI", title: "Live Rosin Explained: One Guy Presses 200,000 Grams a Week", date: "2026-08-19", views: 2668, seconds: 3062 },
  { id: "dEqwv4FBYM4", title: "What Synthetic Feed Does To The Microbes You Paid For", date: "2026-08-21", views: 2625, seconds: 384 },
  { id: "MYsCFAnKY5M", title: "Pre-Roll Machine Sizing: How To Buy For Your Real Volume", date: "2026-08-23", views: 79, seconds: 418 },
  { id: "GSkbEaxQi-0", title: "Fill, Infuse, Close: What Each Station Actually Does", date: "2026-08-25", views: 145, seconds: 464 },
  { id: "C1_tyRx88RM", title: "Plant Stress Explained: The Day 21 Protocol That Trains A Crop", date: "2026-08-26", views: 6059, seconds: 6387 },
  { id: "a_J5xns0jgo", title: "What Actually Comes With The Machine After You Buy", date: "2026-08-28", views: 114, seconds: 364 },
  { id: "JFAmybqoKw4", title: "Dry Farming Explained: How 15 Acres Runs On Rain", date: "2026-09-02", views: 294, seconds: 4749 },
  { id: "8aX6jqzrhes", title: "Bubble Hash Micron Bags: How The 45 To 220 Stack Actually Works", date: "2026-09-04", views: 464, seconds: 337 },
  { id: "oqxsjnRfxh0", title: "He Throws Yield Away On Purpose. Here Is What It Buys Him.", date: "2026-09-06", views: 358, seconds: 334 },
  { id: "nZNTPni2b3Y", title: "How To Cure And Whip Live Rosin Into Cold Cure Batter", date: "2026-09-08", views: 3656, seconds: 359 },
  { id: "UlKm4RmsQ84", title: "Everything You Skip In Veg, You Pay For In Flower", date: "2026-09-11", views: 7165, seconds: 364 },
  { id: "QxQzsNCVTCQ", title: "EDTA Drops It At The Door. Amino Acids Carry It In", date: "2026-09-13", views: 239, seconds: 408 },
  { id: "8456DkDxXBg", title: "What Silicon Actually Does Inside The Leaf", date: "2026-09-15", views: 237, seconds: 285 },
  { id: "HxZ-ofoGXKw", title: "Far-Red and UV Explained", date: "2026-09-16", views: 4911, seconds: 2349 },
  { id: "Obz2d0GCJXQ", title: "VFD Dehumidifiers Explained: What is variable frequency drive?", date: "2026-09-24", views: 1291, seconds: 1845 },
  { id: "sgB14PkgJ8M", title: "3 Ways To Harden Off Transplants Before The Field", date: "2026-09-25", views: 300, seconds: 472 },
  { id: "tcujdHisuFA", title: "Autoflower vs Photoperiod: 2 Harvests In 1 Season?", date: "2026-09-27", views: 191, seconds: 423 },
  { id: "Vl6RmRHDPtw", title: "Greenhouse vs Indoor: Build For What You Can Sell", date: "2026-09-29", views: 122, seconds: 343 },
  { id: "hgSgOK1DuTc", title: "Mixing HPS and LED Grow Lights? Pick One", date: "2026-10-02", views: 2199, seconds: 251 },
  { id: "pZXbqDhR7IU", title: "Under Canopy Lighting: Snake vs Parallel Layout", date: "2026-10-04", views: 2707, seconds: 251 },
  { id: "Zi4h1MJOZL4", title: "Grow Light Rebates: Check the DLC List First", date: "2026-10-06", views: 345, seconds: 215 },
  { id: "v8o5jctLw7M", title: "Beneficial Insects Explained", date: "2026-10-07", views: 148, seconds: 4479 },
]

/** Every Reel posted since TAKEOVER, oldest first. */
export const reels: Reel[] = [
  { code: "DZ-5Sk7D6p2", caption: "Lower costs AND higher yields? That's the double whammy every grower wants.", date: "2026-06-25", plays: 191 },
  { code: "DaC4LiZjXUd", caption: "Four flower rooms = a harvest every two weeks.", date: "2026-06-26", plays: 104 },
  { code: "DaLFGP7k8xj", caption: "Same panel. Double the power.", date: "2026-06-29", plays: 180 },
  { code: "DaTDrOFiWrX", caption: "Half your grow room might be aisle you're paying rent on.", date: "2026-07-03", plays: 145 },
  { code: "DaXeh-NiKH8", caption: "Your license probably limits canopy, not plant count, and it's quietly costing you.", date: "2026-07-04", plays: 351 },
  { code: "Daah5Pgjhli", caption: "The best flower in the world still loses money if your room is half empty.", date: "2026-07-05", plays: 175 },
  { code: "Daf7qNvjydF", caption: "Your aisles are quietly eating a third of the room you pay rent on.", date: "2026-07-08", plays: 169 },
  { code: "Dalqn37Dxkv", caption: "Your dehumidifier quote is probably wrong, and it has nothing to do with square footage.", date: "2026-07-10", plays: 241 },
  { code: "Dap-sXtDakY", caption: "When your lights go off, your grow room quietly tries to rain.", date: "2026-07-11", plays: 288 },
  { code: "DavIOO2jl_s", caption: "Your dehumidifier's pint rating is measured at conditions you never actually run.", date: "2026-07-13", plays: 367 },
  { code: "Da3Gvicloau", caption: "One breakdown should not cost you half your room.", date: "2026-07-17", plays: 716 },
  { code: "Da6Q9yQinyY", caption: "The biggest number on the label stopped selling your flower.", date: "2026-07-18", plays: 950 },
  { code: "DbBZ9qpgCYA", caption: "The best grower on the block is often the first one out of business.", date: "2026-07-21", plays: 192 },
  { code: "DbD_bE6DTyD", caption: "The lighting rule you grew up on is now the fastest way to fall behind.", date: "2026-07-22", plays: 301 },
  { code: "DbJtvL2gNbD", caption: "A grower paid $15,000 for $60,000 worth of lights. Legally.", date: "2026-07-24", plays: 265 },
  { code: "DbTbfRIkti2", caption: "The strongest light on the shelf is the one most likely to waste your money.", date: "2026-07-28", plays: 312 },
  { code: "DbVwJVeip2B", caption: "The cheapest light in the shop bills you every month after you buy it.", date: "2026-07-28", plays: 342 },
  { code: "DbbvTD6AFHa", caption: "The bag of coco you just paid for is holding ocean salt.", date: "2026-07-31", plays: 1305 },
  { code: "DbeUKRjCPss", caption: "You are not paying for growing media. You are paying to move water.", date: "2026-08-01", plays: 466 },
  { code: "Dbs0y_4EdCd", caption: "Aeroponics wins on paper. That is the problem with it.", date: "2026-08-06", plays: 534 },
  { code: "DbvkDfikZTS", caption: "He killed his own harvest by being too good to his plants.", date: "2026-08-07", plays: 3746 },
  { code: "DbyE5TeCpr0", caption: "The floor is not the target, and mixing them up is what kills a block.", date: "2026-08-08", plays: 17003 },
  { code: "Db3UstbDVur", caption: "Your plant stopped drinking and the feed is why, not the room.", date: "2026-08-10", plays: 13644 },
  { code: "Db6gwSBAVjk", caption: "Shot size is an output. You do not get to pick it.", date: "2026-08-12", plays: 8676 },
  { code: "Db_CpwFIHqU", caption: "Your most expensive machine is the one that calls in sick.", date: "2026-08-13", plays: 809 },
  { code: "DcBsKOEjLtE", caption: "The man who builds the machines is telling you not to buy the biggest one.", date: "2026-08-14", plays: 503 },
  { code: "DcEohJ7DLS8", caption: "If part of your grinder wears out, ask where the missing part went.", date: "2026-08-16", plays: 2238 },
  { code: "DcHDGCCj5TR", caption: "Your genetics set the ceiling. Everything you buy just decides how close you get.", date: "2026-08-17", plays: 6018 },
  { code: "DcJUfGGDQRC", caption: "The machines in your back room didn't break. Nobody taught anyone to run them.", date: "2026-08-17", plays: 596 },
  { code: "DcMIIzTEfJJ", caption: "A full preroll line for less than one flagship machine", date: "2026-08-19", plays: 611 },
  { code: "DcOdt5qjalK", caption: "He processes up to 200,000 grams of fresh frozen material a week. Alone.", date: "2026-08-19", plays: 4477 },
  { code: "DcRc1bhj9qG", caption: "A lifelong hash maker just explained why he still won't touch hydrocarbon extracts.", date: "2026-08-21", plays: 600 },
  { code: "DcTnLqPDyTD", caption: "A 20 year hash maker got asked what happens to your rig after a few dozen dabs. He did not dodge it.", date: "2026-08-21", plays: 1815 },
  { code: "DcWL6OJjvWi", caption: "Everyone assumes the extreme cold in solventless is there to protect terpenes. It is not.", date: "2026-08-22", plays: 476 },
  { code: "DcbiYZHifCZ", caption: "Three micron SKUs off one wash. Three separate lab bills.", date: "2026-08-25", plays: 595 },
  { code: "Dcd6ZaeiRhL", caption: "Sun grown pulls bigger microns than indoor. It is not genetics.", date: "2026-08-25", plays: 502 },
  { code: "DcgfJLPjlVx", caption: "He thinks every problem in your room is the same problem.", date: "2026-08-26", plays: 1148 },
  { code: "DcjD6xZgFYU", caption: "He spends 21 days making it perfect so he can ruin it on purpose.", date: "2026-08-27", plays: 1939 },
  { code: "Dclo18aiVbe", caption: "Five problems that should look different. They do not.", date: "2026-08-28", plays: 912 },
  { code: "DcoNYszDdCr", caption: "Go read the back of your silicon bottle. The third number gives it away.", date: "2026-08-29", plays: 517 },
  { code: "DcqyVDklfYx", caption: "The hotspots showed up on day 28. Every run. It was his own crew.", date: "2026-08-30", plays: 1063 },
  { code: "DctXGBAkb2B", caption: "There is no sterile grow room. There is only one you did not choose the occupants of.", date: "2026-08-31", plays: 878 },
  { code: "Dcv9OlADNn3", caption: "His peppers only turned red after he stopped taking care of them.", date: "2026-09-01", plays: 448 },
  { code: "Dcygun-nBvx", caption: "He has never seen a spider mite in the state of Minnesota.", date: "2026-09-02", plays: 248 },
  { code: "Dc1R6PxAUWg", caption: "Fifteen acres. No irrigation. In a drought year. That sounds like negligence until you hear what he is actually irrigating from.", date: "2026-09-04", plays: 262 },
  { code: "Dc3qShzATqY", caption: "\"We are addicted to the control over everything. And we love spraying stuff.\"", date: "2026-09-04", plays: 323 },
  { code: "Dc6O-cUDzIn", caption: "The tag that proves your plants are legal is the one thing you cannot wash off them.", date: "2026-09-05", plays: 267 },
  { code: "Dc-G7qCEd5s", caption: "The good grower and the bad grower know the same things. That is not where they separate.", date: "2026-09-07", plays: 452 },
  { code: "Dc_YrS8EraN", caption: "Beneficials are not a pest program. On the P&L they are a consumable, and consumables are what eat you alive.", date: "2026-09-07", plays: 273 },
  { code: "DdB9erZgerq", caption: "They planned for pests. What nearly beat them was weeds.", date: "2026-09-08", plays: 225 },
  { code: "DdHG6ZIlGvz", caption: "Five dehus, one humidistat, and they all start on the same frame.", date: "2026-09-10", plays: 441 },
  { code: "DdJr76XkqHZ", caption: "Spec your air conditioning first and you will get the number wrong.", date: "2026-09-11", plays: 551 },
  { code: "DdMQsPslS7H", caption: "Beautiful flower, zero smell, and the cause is in your irrigation lines.", date: "2026-09-12", plays: 1155 },
  { code: "DdURg5lAXFj", caption: "The one thing an LED can do that no other grow light can.", date: "2026-09-16", plays: 282 },
  { code: "DdWj0rGAFH2", caption: "\"Full spectrum isn't gonna cut it on its own.\"", date: "2026-09-16", plays: 2921 },
  { code: "DdZK0q-D9Mz", caption: "Even Elliott had to hear this twice: the 4 channels on a tunable LED.", date: "2026-09-17", plays: 2026 },
  { code: "Ddbt6XCCi9s", caption: "Far-red might put your plants to bed an hour and a half early.", date: "2026-09-18", plays: 2439 },
  { code: "Ddg8J6NjlY-", caption: "The bottom growth you keep cutting off is only worthless because it never gets light.", date: "2026-09-20", plays: 6341 },
  { code: "DdjhXMRmEOD", caption: "The UV that builds trichomes is not the UV most people bought.", date: "2026-09-21", plays: 2024 },
  { code: "DdmFcmJCfTi", caption: "Your light did not get weaker. It got further away.", date: "2026-09-22", plays: 2401 },
  { code: "DdoywmhE6cm", caption: "Four flower rooms is not a random number. It is eight weeks divided by two.", date: "2026-09-24", plays: 1205 },
  { code: "DdrKP1YCmdG", caption: "\"Single speed is like riding a children's bicycle. You only get one gear.\"", date: "2026-09-24", plays: 407 },
  { code: "DdtvlJNCJ3n", caption: "Pints per kWh is rated at 100% power. Your grow room doesn't run at 100%.", date: "2026-09-25", plays: 441 },
  { code: "DdwTrVOPTuB", caption: "A VFD dehumidifier fixes three problems. Only one of them is your power bill.", date: "2026-09-26", plays: 400 },
]

export const isMine = (video: ChannelVideo) => video.date >= TAKEOVER

/** A full episode, as opposed to a single-subject cut made from one. */
export const isEpisode = (video: ChannelVideo) => video.seconds >= 15 * 60

const at = (iso: string) => Date.parse(`${iso}T00:00:00Z`)

/** The two numbers the page leads with, derived so they cannot drift. */
export const run = {
  /** Whole weeks between the takeover and the last YouTube count. */
  weeks: Math.floor((at(YOUTUBE_MEASURED) - at(TAKEOVER)) / (7 * 86_400_000)),
  /** Long-form videos plus Shorts published in that time. */
  published: channelVideos.filter(isMine).length + SHORTS_SHIPPED,
}
