// 1節 式の展開と因数分解

// 1項 式の乗法，除法
// ・多項式と単項式の乗法，除法
export * from "./M91111_poly_mono_mul";
export * from "./M91112_poly_mono_div";
// ・(a＋b)(c＋d)の形の式の展開
// ・(2 項式)×(3 項式)を展開すること
export * from "./M91113_poly_poly_mul";

// 2項 乗法の公式
// ・(x＋a)(x＋b)の展開とこれを使った式の展開
export * from "./M91121_waseki_no_kousiki";
// ・平方の公式とこれを使った式の展開
export * from "./M91122_heihou_kousiki";
// ・和と差の積の公式とこれを使った式の展開
export * from "./M91123_wa_to_sa_no_seki";
// ・乗法の公式を組み合わせて，式を計算すること
export * from "./M91124_jyouhou_kousiki";
export * from "./M91125_tenkai_to_seiri";
// ・式の中の共通な部分を 1 つの文字におきかえて展開すること

// 3項 因数分解
// ・式の因数と因数分解の意味
// ・共通因数をくくり出して因数分解すること
export * from "./M91131_kyoutuu_bunkai";
// ・和と差の積の公式を利用して因数分解すること
export * from "./M91132_wa_to_sa_no_bunkai";
// ・平方の公式を利用して因数分解すること
export * from "./M91133_heihou_bunkai";
// ・(x＋a)(x＋b)＝x2＋(a＋b)x＋ab を利用して因数分解すること
export * from "./M91134_waseki_no_bunkai";
// ・共通因数をくくり出したり，共通な部分を１つの文字におきかえたりして因数分解すること
export * from "./M91135_insuu_bunkai";
