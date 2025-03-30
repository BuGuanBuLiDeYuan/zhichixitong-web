import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '关于 - 支持系统',
    description: '了解支持系统理论的核心理念，以及它如何帮助你建立个人成长网络，实现人生突破。',
};

export default function AboutPage() {
    return (
        <div className="about-page">
            {/* 顶部背景元素 */}
            <div className="about-hero">
                <div className="hero-overlay">
                    <div className="tech-circle tech-circle-1"></div>
                    <div className="tech-circle tech-circle-2"></div>
                    <div className="connection-line line-1"></div>
                    <div className="connection-line line-2"></div>
                </div>
                <div className="container">
                    {/* 页面标题 */}
                    <div className="about-header">
                        <h1 className="about-title">关于支持系统</h1>
                        <p className="about-subtitle">
                            探索支持系统理论的核心理念，了解如何构建和运用支持网络
                        </p>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="about-content">
                    {/* 理念介绍 */}
                    <div className="concept-section">
                        <h2 className="section-title">什么是支持系统？</h2>
                        <div className="concept-content">
                            <p className="concept-text">
                                支持系统是一种思想框架，帮助你识别和构建周围的支持网络，使你能够更好地应对挑战，实现个人成长。
                                这一理念源于对人际关系、心理学和成功学的深入研究，旨在帮助每个人都能找到加速自我实现的途径。
                            </p>

                            <p className="concept-text">
                                在现代社会，我们常常被告知要独立自主，但实际上，真正成功的人都有强大的支持网络。
                                支持系统理论告诉我们，识别和构建这样的网络并不是依赖或软弱的表现，而是明智且必要的策略。
                            </p>
                        </div>
                    </div>

                    {/* 三个维度 */}
                    <div className="dimensions-section">
                        <h2 className="section-title">支持系统的三个维度</h2>
                        <p className="section-intro">支持系统理论主要包含三个核心维度：</p>

                        <div className="dimensions-grid">
                            <div className="dimension-card">
                                <div className="dimension-number">1</div>
                                <div className="dimension-content">
                                    <h3 className="dimension-title">识别已有支持</h3>
                                    <p className="dimension-text">
                                        许多人并未意识到他们周围已经存在的支持资源。通过仔细观察和反思，你会发现自己拥有比想象中更多的支持，
                                        包括家人、朋友、同事、导师，甚至是书籍、工具和自然环境等。
                                    </p>
                                </div>
                            </div>

                            <div className="dimension-card">
                                <div className="dimension-number">2</div>
                                <div className="dimension-content">
                                    <h3 className="dimension-title">构建新的支持</h3>
                                    <p className="dimension-text">
                                        当我们明确了目标后，可以有意识地构建新的支持网络。这包括结交志同道合的朋友，
                                        寻找专业领域的导师，参与相关社区，以及学习必要的技能和知识。
                                    </p>
                                </div>
                            </div>

                            <div className="dimension-card">
                                <div className="dimension-number">3</div>
                                <div className="dimension-content">
                                    <h3 className="dimension-title">成为他人的支持</h3>
                                    <p className="dimension-text">
                                        支持系统是双向的。通过为他人提供支持，你不仅能帮助他人成长，还能扩大自己的影响力和资源网络。
                                        施比受更有福，这不仅是一种美德，也是扩大支持系统的有效策略。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 特点比较 */}
                    <div className="comparison-section">
                        <h2 className="section-title">支持系统与其他理论的区别</h2>
                        <div className="comparison-content">
                            <p className="comparison-text">
                                支持系统理论不同于简单的积极思考或心灵鸡汤。它基于实证心理学和社会学研究，
                                提供了具体可行的策略和方法，帮助人们在现实世界中取得进步和成功。
                            </p>

                            <p className="comparison-text">
                                与传统的自助理论不同，支持系统强调的不是孤立的个人奋斗，而是如何利用和构建集体智慧和资源，
                                达成个人无法独自完成的目标。
                            </p>
                        </div>
                    </div>

                    {/* 关于作者 */}
                    <div className="author-section">
                        <div className="author-content">
                            <div className="author-image-container">
                                <div className="author-image">
                                    <span className="author-placeholder">作者头像</span>
                                </div>
                            </div>

                            <div className="author-info">
                                <h2 className="section-title">关于作者</h2>
                                <p className="author-text">
                                    本网站关于支持系统理论的文章，全部来自刘明，<a href="https://x.com/MingLauGodel" target="_blank" rel="noopener noreferrer">推特账号@MingLauGodel （点击查看）</a> 。他将自己的亲身经历和学术研究相结合，提炼出这套实用的支持系统理论，
                                    已帮助数千人突破困境，实现个人和职业目标。
                                </p>
                                <p className="author-text">
                                    作者相信，每个人都有潜力过上充实而有意义的生活，而关键在于找到并善用周围的支持系统。
                                    通过这一系列篇文章，他希望将这一理念传递给更多人，让更多人从中受益。
                                </p>
                                <p className="author-text">
                                    本网站由粉丝制作，非官方网站，与刘明无关。特此声明。
                                </p>

                            </div>
                        </div>
                    </div>

                    {/* 不同类型的支持系统 */}
                    <div className="dimensions-section">
                        <h2 className="section-title">更广概念的支持系统</h2>
                        <p className="section-intro">支持系统是一个广泛的概念，在不同的领域有着不同的含义：</p>

                        <div className="dimensions-grid">
                            <div className="dimension-card">
                                <div className="dimension-number">1</div>
                                <div className="dimension-content">
                                    <h3 className="dimension-title">工程技术领域</h3>
                                    <p className="dimension-text">
                                        在工程学中，支持系统是指为某个工程系统或设备正常运行提供辅助功能的一系列组件或机制。
                                    </p>
                                    <p className="dimension-text">
                                        例如，在航空航天工程中，飞机的液压系统就是一种支持系统。它为飞机的起落架收放、襟翼操控等提供动力支持，确保飞机在起飞、降落和飞行过程中的各种操作得以顺利进行。
                                    </p>
                                </div>
                            </div>

                            <div className="dimension-card">
                                <div className="dimension-number">2</div>
                                <div className="dimension-content">
                                    <h3 className="dimension-title">计算机科学领域</h3>
                                    <p className="dimension-text">
                                        计算机支持系统是为用户使用计算机提供各种帮助和服务的软件系统。它旨在提高用户的工作效率、改善用户体验并确保计算机系统的稳定运行。
                                    </p>
                                    <p className="dimension-text">
                                        例如，操作系统本身就是一种重要的计算机支持系统。像Windows操作系统，它管理计算机的硬件资源（如CPU、内存、硬盘等），为用户提供一个方便的操作界面，使用户能够运行各种应用程序。
                                    </p>

                                </div>
                            </div>

                            <div className="dimension-card">
                                <div className="dimension-number">3</div>
                                <div className="dimension-content">
                                    <h3 className="dimension-title">社会科学领域（本网站）</h3>
                                    <p className="dimension-text">
                                        在社会科学中，支持系统通常指个人或群体周围的社会关系网络，这些关系为个人或群体提供情感、物质、信息等方面的支持。</p>
                                    <p className="dimension-text">
                                        例如，家庭是一个人重要的支持系统。家庭成员之间相互关爱、支持，在遇到困难时给予情感上的慰藉，如当一个人失业时，家人可能会给予鼓励和安慰，帮助他重新寻找工作机会。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 联系方式 */}
                    <div id="contact" className="contact-section">
                        <h2 className="section-title">联系我们</h2>

                        <div className="contact-grid">
                            <div className="contact-card">
                                <h3 className="contact-title">商务合作</h3>
                                <p className="contact-text">
                                    如果您对本站内容感兴趣，希望进行商务合作，请联系：
                                </p>
                                <p className="contact-email">
                                    business@zhichixitong.com
                                </p>
                            </div>

                            <div className="contact-card">
                                <h3 className="contact-title">讲座邀请</h3>
                                <p className="contact-text">
                                    如果您希望邀请作者进行线上或线下的支持系统主题讲座，请联系：
                                </p>
                                <p className="contact-email">
                                    talks@zhichixitong.com
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 