import React from 'react';
import { ShieldCheck, X } from 'lucide-react';

// 用户服务协议内容
export const UserAgreementContent = () => (
  <div className="max-w-none space-y-4">
    <div className="text-center mb-6">
      <h1 className="font-serif text-2xl font-bold text-emerald-700 text-emerald-400 mb-2">用户服务协议</h1>
      <p className="text-sm text-stone-400 text-stone-400">更新日期：2026年6月8日</p>
    </div>
    
    <div className="bg-emerald-50 bg-emerald-950/20 p-4 rounded-xl border border-emerald-200 border-emerald-900/40 mb-6">
      <p className="text-sm text-stone-300 text-stone-300">
        欢迎使用「茗序茶经」应用。本协议是您与光年跃迁（温州）科技有限公司之间关于使用本应用的法律协议。
      </p>
    </div>
    
    <section className="space-y-3">
      <h2 className="font-serif text-lg font-semibold text-stone-100 text-stone-100 border-b border-stone-800 border-stone-800 pb-2">1. 协议的接受</h2>
      <p className="text-sm text-stone-300 text-stone-300 leading-relaxed">
        通过下载、安装或使用本应用，您表示同意接受本协议的全部条款和条件。
      </p>
    </section>
    
    <section className="space-y-3">
      <h2 className="font-serif text-lg font-semibold text-stone-100 text-stone-100 border-b border-stone-800 border-stone-800 pb-2">2. 服务内容</h2>
      <p className="text-sm text-stone-300 text-stone-300">本应用提供以下服务：</p>
      <ul className="list-disc pl-5 space-y-2 text-sm text-stone-300 text-stone-300">
        <li>茶叶百科知识查询</li>
        <li>智能泡茶计时器</li>
        <li>泡茶游戏模拟</li>
        <li>个人收藏和历史记录管理</li>
      </ul>
    </section>
    
    <section className="space-y-3">
      <h2 className="font-serif text-lg font-semibold text-stone-100 text-stone-100 border-b border-stone-800 border-stone-800 pb-2">3. 用户义务</h2>
      <p className="text-sm text-stone-300 text-stone-300">作为本应用的用户，您同意：</p>
      <ul className="list-disc pl-5 space-y-2 text-sm text-stone-300 text-stone-300">
        <li>遵守本协议的所有条款</li>
        <li>不使用本应用进行任何非法活动</li>
        <li>不干扰本应用的正常运行</li>
        <li>保护您的设备安全，防止未授权访问</li>
      </ul>
    </section>
    
    <section className="space-y-3">
      <h2 className="font-serif text-lg font-semibold text-stone-100 text-stone-100 border-b border-stone-800 border-stone-800 pb-2">4. 知识产权</h2>
      <p className="text-sm text-stone-300 text-stone-300 leading-relaxed">
        本应用的所有内容，包括但不限于文字、图像、音频、视频、软件等，均受知识产权法律保护。
      </p>
      <p className="text-sm text-stone-300 text-stone-300 leading-relaxed">
        未经我们的书面许可，您不得复制、修改、分发或商业使用本应用的任何内容。
      </p>
    </section>
    
    <section className="space-y-3">
      <h2 className="font-serif text-lg font-semibold text-stone-100 text-stone-100 border-b border-stone-800 border-stone-800 pb-2">5. 免责声明</h2>
      <p className="text-sm text-stone-300 text-stone-300">本应用按「原样」提供，不做任何形式的保证。</p>
      <p className="text-sm text-stone-300 text-stone-300">我们不保证：</p>
      <ul className="list-disc pl-5 space-y-2 text-sm text-stone-300 text-stone-300">
        <li>本应用将符合您的要求</li>
        <li>本应用将无中断、及时、安全或无错误地运行</li>
        <li>本应用的使用结果将是准确或可靠的</li>
      </ul>
    </section>
    
    <section className="space-y-3">
      <h2 className="font-serif text-lg font-semibold text-stone-100 text-stone-100 border-b border-stone-800 border-stone-800 pb-2">6. 终止</h2>
      <p className="text-sm text-stone-300 text-stone-300 leading-relaxed">
        我们有权在任何时候，出于任何原因，终止或暂停您对本应用的访问。
      </p>
      <p className="text-sm text-stone-300 text-stone-300 leading-relaxed">
        您也可以随时停止使用本应用。
      </p>
    </section>
    
    <section className="space-y-3">
      <h2 className="font-serif text-lg font-semibold text-stone-100 text-stone-100 border-b border-stone-800 border-stone-800 pb-2">7. 适用法律</h2>
      <p className="text-sm text-stone-300 text-stone-300 leading-relaxed">
        本协议受中华人民共和国法律管辖。
      </p>
      <p className="text-sm text-stone-300 text-stone-300 leading-relaxed">
        任何与本协议相关的争议，应通过友好协商解决；协商不成的，应提交至温州市有管辖权的人民法院诉讼解决。
      </p>
    </section>
  </div>
);

// 隐私政策内容
export const PrivacyPolicyContent = () => (
  <div className="max-w-none space-y-4">
    <div className="text-center mb-6">
      <h1 className="font-serif text-2xl font-bold text-emerald-700 text-emerald-400 mb-2">🔒 隐私政策</h1>
      <p className="text-sm text-stone-400 text-stone-400"><strong>生效日期</strong>：2026年6月8日</p>
    </div>

    <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 from-emerald-950/30 to-emerald-900/20 p-5 rounded-xl border-l-4 border-emerald-600 border-emerald-500 mb-6">
      <p className="text-sm text-stone-200 text-stone-200 leading-relaxed">
        欢迎使用「茗序茶经」。本应用由<strong>光年跃迁（温州）科技有限公司</strong>开发并运营。我们深知个人信息对您的重要性，将严格遵守《中华人民共和国个人信息保护法》等相关法律法规，保护您的个人信息安全。
      </p>
    </div>

    <p className="text-sm text-stone-300 text-stone-300 leading-relaxed mb-4">
      本隐私政策旨在说明我们如何收集、使用、存储和保护您在使用本应用过程中提供的个人信息，以及您对这些信息所享有的权利。请您在使用本应用前仔细阅读并充分理解本政策的全部内容，尤其是加粗的条款。如您对本政策有任何疑问、意见或建议，可通过本政策末尾提供的联系方式与我们联系。
    </p>

    <section className="space-y-3">
      <h2 className="font-serif text-lg font-semibold text-stone-100 text-stone-100 border-b border-stone-800 border-stone-800 pb-2">一、我们收集的信息</h2>
      <p className="text-sm text-stone-300 text-stone-300 mb-2">在您使用本应用的过程中，我们会收集以下信息，以提供、维护和改进我们的服务：</p>
      <ol className="list-decimal pl-5 space-y-3">
        <li className="text-sm text-stone-300 text-stone-300 leading-relaxed"><strong>使用数据</strong>：您在使用本应用过程中主动收藏的<strong>茶品信息、茶学知识、冲泡记录及游戏考核数据</strong>。这些数据是本应用的核心功能内容，用于为您提供个性化的茶文化体验。</li>
        <li className="text-sm text-stone-300 text-stone-300 leading-relaxed"><strong>设备信息</strong>：为了保障应用的稳定运行和优化用户体验，我们会自动收集您的设备相关信息，包括但不限于<strong>设备型号、操作系统版本、设备标识符（如IMEI/Android ID）、IP地址</strong>等。</li>
      </ol>
    </section>

    <section className="space-y-3">
      <h2 className="font-serif text-lg font-semibold text-stone-100 text-stone-100 border-b border-stone-800 border-stone-800 pb-2">二、我们如何使用收集的信息</h2>
      <p className="text-sm text-stone-300 text-stone-300 mb-2">我们仅会在以下合法、正当、必要的范围内使用您的个人信息：</p>
      <ol className="list-decimal pl-5 space-y-3">
        <li className="text-sm text-stone-300 text-stone-300 leading-relaxed"><strong>提供和改进服务</strong>：使用您的收藏和记录数据来实现个性化推荐、历史记录等核心功能；通过分析设备信息和使用数据，优化应用性能，修复已知问题，提升用户体验。</li>
        <li className="text-sm text-stone-300 text-stone-300 leading-relaxed"><strong>数据分析和统计</strong>：在对您的个人信息进行匿名化或去标识化处理后，进行内部数据分析和统计，以了解用户群体的使用习惯和需求，从而更好地规划和改进产品功能。</li>
      </ol>
    </section>

    <section className="space-y-3">
      <h2 className="font-serif text-lg font-semibold text-stone-100 text-stone-100 border-b border-stone-800 border-stone-800 pb-2">三、我们如何共享、转让和公开披露信息</h2>
      <p className="text-sm text-stone-300 text-stone-300 mb-2">我们郑重承诺，严格保护您的个人信息，不会在以下情形之外向任何第三方共享、转让或公开披露您的信息：</p>
      <ol className="list-decimal pl-5 space-y-3">
        <li className="text-sm text-stone-300 text-stone-300 leading-relaxed"><strong>法定情形</strong>：根据法律法规的规定、行政或司法机关的强制性要求，我们可能会向有关部门披露您的相关信息。</li>
        <li className="text-sm text-stone-300 text-stone-300 leading-relaxed"><strong>获得明确同意</strong>：在获得您的明确书面同意后，我们才会向第三方共享您的个人信息。</li>
        <li className="text-sm text-stone-300 text-stone-300 leading-relaxed"><strong>业务必要且合规</strong>：为了实现本政策第二条所述的目的，我们可能会与提供技术支持、支付服务或其他必要服务的合作伙伴共享必要的信息，但我们会要求其严格遵守本政策及相关法律法规，并对您的信息承担保密义务。</li>
      </ol>
    </section>

    <section className="space-y-3">
      <h2 className="font-serif text-lg font-semibold text-stone-100 text-stone-100 border-b border-stone-800 border-stone-800 pb-2">四、我们如何存储和保护信息</h2>
      <ol className="list-decimal pl-5 space-y-3">
        <li className="text-sm text-stone-300 text-stone-300 leading-relaxed"><strong>存储地点和期限</strong>：您的个人信息将存储于中华人民共和国境内的安全服务器上。我们会在实现本政策所述目的所必需的最短时间内保留您的信息，超出此期限后，我们将对您的信息进行删除或匿名化处理。</li>
        <li className="text-sm text-stone-300 text-stone-300 leading-relaxed"><strong>安全措施</strong>：我们采用符合行业标准的技术手段和安全管理措施来保护您的个人信息，包括但不限于数据加密、访问控制、安全审计等，以防止信息泄露、丢失、篡改或被未经授权的访问。</li>
      </ol>
    </section>

    <section className="space-y-3">
      <h2 className="font-serif text-lg font-semibold text-stone-100 text-stone-100 border-b border-stone-800 border-stone-800 pb-2">五、您的权利</h2>
      <p className="text-sm text-stone-300 text-stone-300 mb-2">根据相关法律法规，您对您的个人信息享有以下权利：</p>
      <ol className="list-decimal pl-5 space-y-3">
        <li className="text-sm text-stone-300 text-stone-300 leading-relaxed"><strong>访问权</strong>：您可以随时在本应用中查看和管理您的收藏数据及历史记录。</li>
        <li className="text-sm text-stone-300 text-stone-300 leading-relaxed"><strong>更正权</strong>：如您发现您的数据存在错误，您可以在应用内进行修改和更正。</li>
        <li className="text-sm text-stone-300 text-stone-300 leading-relaxed"><strong>删除权</strong>：您可以随时删除收藏记录或历史记录，应用将立即删除相关数据。</li>
        <li className="text-sm text-stone-300 text-stone-300 leading-relaxed"><strong>数据导出</strong>：本应用所有数据存储在您的设备本地，您可以通过设备备份等方式导出您的数据。</li>
      </ol>
    </section>

    <section className="space-y-3">
      <h2 className="font-serif text-lg font-semibold text-stone-100 text-stone-100 border-b border-stone-800 border-stone-800 pb-2">六、未成年人保护</h2>
      <p className="text-sm text-stone-300 text-stone-300 leading-relaxed">
        我们非常重视对未成年人个人信息的保护。如您是未满14周岁的未成年人，在使用本应用前，应在监护人的指导下仔细阅读本政策，并征得监护人的同意。如我们发现自己在未事先获得监护人可验证同意的情况下收集了未成年人的个人信息，将立即删除相关数据。
      </p>
    </section>

    <section className="space-y-3">
      <h2 className="font-serif text-lg font-semibold text-stone-100 text-stone-100 border-b border-stone-800 border-stone-800 pb-2">七、本政策的更新</h2>
      <p className="text-sm text-stone-300 text-stone-300 leading-relaxed">
        我们可能会根据法律法规的更新、业务的调整或技术的发展，适时对本隐私政策进行修订。修订后的政策将在本应用内显著位置公示，并在生效前通过合理方式通知您。如您继续使用本应用，即表示您同意接受修订后的政策。
      </p>
    </section>

    <section className="space-y-3">
      <h2 className="font-serif text-lg font-semibold text-stone-100 text-stone-100 border-b border-stone-800 border-stone-800 pb-2">八、联系我们</h2>
      <p className="text-sm text-stone-300 text-stone-300 mb-3">如您对本隐私政策有任何疑问、意见或建议，或需要行使您的相关权利，请通过以下方式与我们联系：</p>
      <div className="bg-stone-950 bg-stone-900/50 p-4 rounded-xl border border-stone-800 border-stone-800">
        <p className="text-sm text-stone-300 text-stone-300"><strong>电子邮箱</strong>：Jp112022@163.com</p>
      </div>
    </section>

    <div className="mt-8 pt-6 border-t border-stone-800 border-stone-800 text-center">
      <p className="text-sm text-stone-400 text-stone-400 mb-2">感谢您使用茗序茶经！</p>
      <p className="text-sm text-stone-400 text-stone-400 mb-4">我们致力于为您提供安全、便捷的茶文化体验。</p>
      <p className="text-xs text-stone-400 text-stone-400">© 2026 光年跃迁（温州）科技有限公司 版权所有</p>
    </div>
  </div>
);

// 协议详情弹窗
export const AgreementModal = ({ onClose, title, content }: { 
  onClose: () => void, 
  title: string, 
  content: React.ReactNode 
}) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-[60]">
    <div className="bg-stone-900 bg-stone-900 rounded-2xl w-full max-w-lg h-[65vh] overflow-hidden shadow-2xl border border-stone-800 border-stone-800 flex flex-col animate-fade-in mt-[80px]">
      <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 border-stone-800 bg-stone-900 bg-stone-900 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 bg-emerald-900/30 text-emerald-700 text-emerald-400 rounded-xl flex items-center justify-center">
            <ShieldCheck size={22} />
          </div>
          <h2 className="font-serif text-xl font-bold text-stone-100 text-stone-100">{title}</h2>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white active:scale-90 transition-transform hover:bg-emerald-500 shadow-md"
        >
          <X size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto bg-stone-950 bg-stone-950 p-6">
        {content}
      </div>
    </div>
  </div>
);

// 隐私政策同意弹窗
export const PrivacyModal = ({ 
  onAccept, 
  onDecline, 
  showAgreementModal, 
  onOpenAgreement, 
  onOpenPrivacy 
}: { 
  onAccept: () => void, 
  onDecline: () => void, 
  showAgreementModal: string | null, 
  onOpenAgreement: () => void, 
  onOpenPrivacy: () => void 
}) => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 z-50">
    <div className="bg-stone-900 bg-stone-900 w-full max-w-sm shadow-2xl max-h-[80vh] overflow-y-auto rounded-2xl animate-fade-in border border-stone-800 border-stone-800">
      <div className="p-6">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-emerald-700 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
        </div>
        <h3 className="font-serif text-xl font-bold text-stone-100 text-stone-100 mb-3 text-center pt-2">
          用户协议与隐私政策
        </h3>
        <div className="mb-5 space-y-2">
          <p className="text-sm text-stone-300 text-stone-300">(1)《隐私政策》中关于个人设备用户信息的收集和使用的说明。</p>
          <p className="text-sm text-stone-300 text-stone-300">(2)《隐私政策》中与第三方SDK类服务商数据共享、相关信息收集和使用说明。</p>
        </div>
        <div className="mb-6">
          <p className="text-xs text-stone-400 text-stone-400 mb-2">用户协议和隐私政策说明：</p>
          <p className="text-sm text-stone-300 text-stone-300 leading-relaxed">
            阅读完整的
            <span
              onClick={onOpenAgreement}
              className="text-emerald-700 text-emerald-400 hover:underline cursor-pointer font-medium"
            >
              《用户服务协议》
            </span>
            和
            <span
              onClick={onOpenPrivacy}
              className="text-emerald-700 text-emerald-400 hover:underline cursor-pointer font-medium"
            >
              《隐私政策》
            </span>
            了解详细内容。
          </p>
        </div>
      </div>
      <div className="flex border-t border-stone-800 border-stone-800">
        <button
          onClick={onDecline}
          className="flex-1 py-4 text-base font-medium text-stone-300 text-stone-300 bg-stone-900 bg-stone-900 border-r border-stone-800 border-stone-800 rounded-bl-2xl hover:bg-stone-950 hover:bg-stone-800/50 transition-colors"
        >
          不同意
        </button>
        <button
          onClick={onAccept}
          className="flex-1 py-4 text-base font-medium text-white bg-emerald-700 bg-emerald-600 hover:bg-emerald-600 hover:bg-emerald-500 rounded-br-2xl transition-colors shadow-sm"
        >
          同意并继续
        </button>
      </div>
    </div>

    {/* 协议详情弹窗 */}
    {showAgreementModal === 'agreement' && (
      <AgreementModal 
        onClose={() => onOpenAgreement()} 
        title="用户服务协议" 
        content={<UserAgreementContent />} 
      />
    )}
    {showAgreementModal === 'privacy' && (
      <AgreementModal 
        onClose={() => onOpenPrivacy()} 
        title="隐私政策" 
        content={<PrivacyPolicyContent />} 
      />
    )}
  </div>
);

// 拒绝确认弹窗
export const DeclineModal = ({ onCancel, onConfirm }: { 
  onCancel: () => void, 
  onConfirm: () => void 
}) => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 z-[60]">
    <div className="bg-stone-900 bg-stone-900 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-stone-800 border-stone-800 flex flex-col animate-fade-in">
      <div className="flex-1 p-6">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-rose-100 bg-rose-900/30 text-rose-700 text-rose-400 rounded-xl flex items-center justify-center">
            <ShieldCheck size={24} />
          </div>
        </div>
        <h2 className="font-serif text-xl font-bold text-stone-100 text-stone-100 mb-3 text-center">确认拒绝</h2>
        <p className="text-center text-stone-400 text-stone-400 mb-2">您确定要拒绝隐私政策吗？</p>
        <p className="text-center text-sm text-stone-400 text-stone-400">拒绝后将无法使用我们的服务。</p>
      </div>
      <div className="flex border-t border-stone-800 border-stone-800">
        <button
          onClick={onCancel}
          className="flex-1 py-4 text-center text-stone-400 text-stone-400 font-medium hover:bg-stone-950 hover:bg-stone-800/50 transition-colors"
        >
          取消
        </button>
        <div className="w-px bg-stone-200 bg-stone-800"></div>
        <button
          onClick={onConfirm}
          className="flex-1 py-4 text-center text-emerald-700 text-emerald-400 font-medium hover:bg-emerald-50 hover:bg-emerald-900/20 transition-colors"
        >
          确定
        </button>
      </div>
    </div>
  </div>
);