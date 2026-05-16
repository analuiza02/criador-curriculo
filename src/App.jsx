import React, { useState } from 'react';
// Importação dos ícones da biblioteca lucide-react
import { 
  Printer, Plus, Trash2, Mail, Phone, MapPin, 
  Github, Linkedin, GraduationCap, Award, 
  Lightbulb, Target, User, Languages 
} from 'lucide-react';

export default function App() {
  // Estado completo com todas as seções mapeadas
  const [resumeData, setResumeData] = useState({
    name: 'ANA LUIZA DE OLIVEIRA FERREIRA',
    role: 'Ciências Econômicas & Tecnologia',
    email: 'ana.luizaolifer@gmail.com',
    phone: '(11) 99566-9895',
    location: 'Ribeirão Pires, SP',
    linkedin: 'linkedin.com/in/ana-luiza-de-oliveira-ferreira-181596266/',
    github: 'github.com/analuiza02',
    photo: '',
    showExperience: true,
    experience: [],
    accentColor: '#818cf8',
    sidebarColor: '#0f172a',
    sectionBgColor: '#f8fafc',
    textColor: '#0f172a',
    objective: 'Busco oportunidade de estágio ou posição júnior na área de tecnologia, com interesse em desenvolvimento, dados e análise de informações, visando desenvolver minhas habilidades técnicas e profissionais.',
    skills: [
      { id: 1, name: 'Python', level: 90 },
      { id: 2, name: 'SQL', level: 85 },
      { id: 3, name: 'JavaScript', level: 80 },
      { id: 4, name: 'React', level: 75 },
      { id: 5, name: 'Java', level: 70 },
      { id: 6, name: 'Git & GitHub', level: 90 }
    ],
    education: [
      { id: 1, course: 'Bacharelado em Ciências Econômicas', institution: 'Universidade Federal do ABC (UFABC)', period: 'Cursando' },
      { id: 2, course: 'Técnico em Informática para Internet', institution: 'ETEC de Ribeirão Pires', period: 'Concluído' }
    ],
    courses: [
      { id: 1, name: 'Fundamentos de Engenharia de Dados', provider: 'Data Science Academy', status: 'Em andamento' },
      { id: 2, name: 'Desenvolvimento Orientado a Objetos (Python)', provider: 'Fundação Bradesco', status: 'Em andamento' }
    ],
    competencies: ['Trabalho em equipe', 'Organização e pontualidade', 'Facilidade de aprendizado', 'Boa comunicação', 'Autonomia'],
    languages: [
      { id: 1, name: 'Português', level: 'Nativo' },
      { id: 2, name: 'Inglês', level: 'B2 (Intermediário-Avançado)' }
    ]
  });

  // Atualizar campos simples de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData({ ...resumeData, [name]: value });
  };

  // Atualizar propriedades dentro de listas de objetos
  const handleArrayChange = (index, field, value, arrayName) => {
    const newArray = [...resumeData[arrayName]];
    newArray[index][field] = value;
    setResumeData({ ...resumeData, [arrayName]: newArray });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setResumeData({ ...resumeData, photo: reader.result || '' });
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setResumeData({ ...resumeData, photo: '' });
  };

  const toggleExperienceVisibility = () => {
    setResumeData({ ...resumeData, showExperience: !resumeData.showExperience });
  };

  const applyTheme = (theme) => {
    setResumeData({ ...resumeData, ...theme });
  };

  // Adicionar dinamicamente um novo item à lista desejada
  const addItem = (arrayName, emptyItem) => {
    setResumeData({
      ...resumeData,
      [arrayName]: [...resumeData[arrayName], { id: Date.now(), ...emptyItem }]
    });
  };

  // Remover um item específico da lista
  const removeItem = (index, arrayName) => {
    const newArray = [...resumeData[arrayName]];
    newArray.splice(index, 1);
    setResumeData({ ...resumeData, [arrayName]: newArray });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-100 font-sans overflow-hidden">
      
      {/* Configurações de CSS para Impressão limpa em A4 */}
      <style>
        {`
          @media print {
            html, body { margin: 0 !important; padding: 0 !important; overflow: hidden !important; }
            body { background: white !important; }
            .no-print { display: none !important; }
            .a4-page { 
              width: 100% !important; 
              min-height: 100% !important; 
              box-shadow: none !important; 
              margin: 0 !important; 
              border: none !important;
              overflow: visible !important;
            }
            @page { margin: 0; size: A4; }
          }
          .skill-bar-bg { height: 6px; background: #334155; border-radius: 3px; overflow: hidden; }
          .skill-bar-fill { height: 100%; background: #818cf8; border-radius: 3px; transition: width 0.3s ease; }
        `}
      </style>

      {/* PAINEL DE EDIÇÃO (ESQUERDO) */}
      <div className="no-print w-full md:w-[420px] bg-white border-r border-slate-200 overflow-y-auto flex flex-col z-10 shadow-xl">
        <div className="p-6 bg-slate-900 text-white sticky top-0 z-20 flex justify-between items-center shadow-md">
          <h1 className="text-md font-bold uppercase tracking-wider flex items-center gap-2">
            <Award size={18} className="text-indigo-400"/> Monte seu Currículo
          </h1>
          <button 
            onClick={() => window.print()} 
            className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition shadow-md"
          >
            <Printer size={14} /> Exportar PDF
          </button>
        </div>

        <div className="p-6 space-y-8">
          
          {/* Seção: Informações Pessoais */}
          <section>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 border-b pb-2 flex items-center gap-2"><User size={14}/> Dados Pessoais</h2>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500">Nome Completo</label>
                <input type="text" name="name" value={resumeData.name} onChange={handleChange} className="w-full border border-slate-200 rounded p-2 text-sm outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500">Cargo / Área de Atuação</label>
                <input type="text" name="role" value={resumeData.role} onChange={handleChange} className="w-full border border-slate-200 rounded p-2 text-sm outline-none focus:border-indigo-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500">E-mail</label>
                  <input type="text" name="email" value={resumeData.email} onChange={handleChange} className="w-full border border-slate-200 rounded p-2 text-xs outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500">Telefone</label>
                  <input type="text" name="phone" value={resumeData.phone} onChange={handleChange} className="w-full border border-slate-200 rounded p-2 text-xs outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500">LinkedIn</label>
                  <input type="text" name="linkedin" value={resumeData.linkedin} onChange={handleChange} className="w-full border border-slate-200 rounded p-2 text-xs outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500">GitHub</label>
                  <input type="text" name="github" value={resumeData.github} onChange={handleChange} className="w-full border border-slate-200 rounded p-2 text-xs outline-none focus:border-indigo-500" />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500">Foto de perfil</label>
                <input type="file" accept="image/*" onChange={handlePhotoChange} className="w-full border border-slate-200 rounded p-2 text-xs outline-none file:text-xs file:font-semibold file:border-0 file:bg-slate-100 file:text-slate-700" />
                {resumeData.photo && (
                  <button type="button" onClick={removePhoto} className="mt-2 text-red-600 hover:text-red-700 text-xs font-semibold">
                    Remover foto
                  </button>
                )}
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500">Objetivo Profissional</label>
                <textarea name="objective" value={resumeData.objective} onChange={handleChange} rows="3" className="w-full border border-slate-200 rounded p-2 text-xs outline-none focus:border-indigo-500 resize-none" />
              </div>
            </div>
          </section>

          {/* Seção: Habilidades Técnicas */}
          <section>
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Lightbulb size={14}/> Habilidades & Nível</h2>
              <button
                onClick={() => addItem('skills', { name: '', level: 0 })}
                className="text-indigo-600 hover:bg-indigo-50 p-1 rounded transition"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="space-y-2">
              {resumeData.skills.map((skill, index) => (
                <div key={skill.id || index} className="flex gap-2">
                  <input value={skill.name} onChange={(e) => handleArrayChange(index, 'name', e.target.value, 'skills')} className="w-2/3 border border-slate-200 rounded p-1.5 text-xs outline-none" placeholder="Tecnologia" />
                  <input type="number" min="0" max="100" value={skill.level} onChange={(e) => handleArrayChange(index, 'level', parseInt(e.target.value) || 0, 'skills')} className="w-1/3 border border-slate-200 rounded p-1.5 text-xs outline-none text-center" placeholder="%" />
                </div>
              ))}
            </div>
          </section>

          {/* Seção: Experiência Profissional (Opcional) */}
          <section>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 border-b pb-2">
              <div className="flex items-center gap-2">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><User size={14}/> Experiência Profissional</h2>
                <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">Opcional</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => addItem('experience', { role: '', company: '', period: '', description: '' })}
                  className="text-indigo-600 hover:bg-indigo-50 p-1 rounded transition"
                >
                  <Plus size={16} />
                </button>
                <button
                  type="button"
                  onClick={toggleExperienceVisibility}
                  className="text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-[10px] font-semibold transition"
                >
                  {resumeData.showExperience ? 'Ocultar no preview' : 'Mostrar no preview'}
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {resumeData.experience.map((item, index) => (
                <div key={item.id || index} className="relative p-3 bg-slate-50 rounded border border-slate-200 group">
                  <button onClick={() => removeItem(index, 'experience')} className="absolute top-2 right-2 text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                  <div className="space-y-2 mt-1">
                    <input placeholder="Cargo / Função" value={item.role} onChange={(e) => handleArrayChange(index, 'role', e.target.value, 'experience')} className="w-full border border-slate-200 bg-white rounded p-1 text-xs outline-none" />
                    <input placeholder="Empresa" value={item.company} onChange={(e) => handleArrayChange(index, 'company', e.target.value, 'experience')} className="w-full border border-slate-200 bg-white rounded p-1 text-xs outline-none" />
                    <input placeholder="Período (Ex: 2023 - 2024)" value={item.period} onChange={(e) => handleArrayChange(index, 'period', e.target.value, 'experience')} className="w-full border border-slate-200 bg-white rounded p-1 text-xs outline-none" />
                    <textarea placeholder="Descrição das atividades" value={item.description} onChange={(e) => handleArrayChange(index, 'description', e.target.value, 'experience')} rows="2" className="w-full border border-slate-200 bg-white rounded p-1 text-xs outline-none resize-none" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Seção: Formação Acadêmica */}
          <section>
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><GraduationCap size={14}/> Formação Acadêmica</h2>
              <button 
                onClick={() => addItem('education', { course: '', institution: '', period: '' })}
                className="text-indigo-600 hover:bg-indigo-50 p-1 rounded transition"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="space-y-3">
              {resumeData.education.map((edu, index) => (
                <div key={edu.id} className="relative p-3 bg-slate-50 rounded border border-slate-200 group">
                  <button onClick={() => removeItem(index, 'education')} className="absolute top-2 right-2 text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                  <div className="space-y-2 mt-1">
                    <input placeholder="Curso / Grau" value={edu.course} onChange={(e) => handleArrayChange(index, 'course', e.target.value, 'education')} className="w-full border border-slate-200 bg-white rounded p-1 text-xs outline-none" />
                    <input placeholder="Instituição" value={edu.institution} onChange={(e) => handleArrayChange(index, 'institution', e.target.value, 'education')} className="w-full border border-slate-200 bg-white rounded p-1 text-xs outline-none" />
                    <input placeholder="Período (Ex: Cursando / 2021 - 2024)" value={edu.period} onChange={(e) => handleArrayChange(index, 'period', e.target.value, 'education')} className="w-full border border-slate-200 bg-white rounded p-1 text-xs outline-none" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* NOVA SEÇÃO: Cursos Complementares */}
          <section>
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Award size={14}/> Cursos Complementares</h2>
              <button 
                onClick={() => addItem('courses', { name: '', provider: '', status: '' })}
                className="text-indigo-600 hover:bg-indigo-50 p-1 rounded transition"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="space-y-3">
              {resumeData.courses.map((course, index) => (
                <div key={course.id} className="relative p-3 bg-slate-50 rounded border border-slate-200">
                  <button onClick={() => removeItem(index, 'courses')} className="absolute top-2 right-2 text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                  <div className="space-y-2 mt-1">
                    <input placeholder="Nome do Curso" value={course.name} onChange={(e) => handleArrayChange(index, 'name', e.target.value, 'courses')} className="w-full border border-slate-200 bg-white rounded p-1 text-xs outline-none" />
                    <input placeholder="Instituição / Plataforma" value={course.provider} onChange={(e) => handleArrayChange(index, 'provider', e.target.value, 'courses')} className="w-full border border-slate-200 bg-white rounded p-1 text-xs outline-none" />
                    <input placeholder="Status (Ex: Concluído / Em andamento)" value={course.status} onChange={(e) => handleArrayChange(index, 'status', e.target.value, 'courses')} className="w-full border border-slate-200 bg-white rounded p-1 text-xs outline-none" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* NOVA SEÇÃO: Idiomas */}
          <section>
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Languages size={14}/> Idiomas</h2>
              <button 
                onClick={() => addItem('languages', { name: '', level: '' })}
                className="text-indigo-600 hover:bg-indigo-50 p-1 rounded transition"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="space-y-3">
              {resumeData.languages.map((lang, index) => (
                <div key={lang.id} className="relative p-3 bg-slate-50 rounded border border-slate-200">
                  <button onClick={() => removeItem(index, 'languages')} className="absolute top-2 right-2 text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                  <div className="flex gap-2 mt-1">
                    <input placeholder="Idioma" value={lang.name} onChange={(e) => handleArrayChange(index, 'name', e.target.value, 'languages')} className="w-1/2 border border-slate-200 bg-white rounded p-1 text-xs outline-none" />
                    <input placeholder="Nível (Ex: Avançado / B2)" value={lang.level} onChange={(e) => handleArrayChange(index, 'level', e.target.value, 'languages')} className="w-1/2 border border-slate-200 bg-white rounded p-1 text-xs outline-none" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Seção: Personalização de cores */}
          <section>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 border-b pb-2">Customizar design</h2>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <button type="button" onClick={() => applyTheme({ accentColor: '#818cf8', sidebarColor: '#0f172a', sectionBgColor: '#f8fafc', textColor: '#0f172a' })} className="rounded border border-slate-200 bg-white py-2 text-[10px] font-semibold hover:bg-slate-100">
                Padrão
              </button>
              <button type="button" onClick={() => applyTheme({ accentColor: '#10b981', sidebarColor: '#064e3b', sectionBgColor: '#ecfdf5', textColor: '#065f46' })} className="rounded border border-slate-200 bg-white py-2 text-[10px] font-semibold hover:bg-slate-100">
                Suave
              </button>
              <button type="button" onClick={() => applyTheme({ accentColor: '#d97706', sidebarColor: '#7c2d12', sectionBgColor: '#fffbeb', textColor: '#7c2d12' })} className="rounded border border-slate-200 bg-white py-2 text-[10px] font-semibold hover:bg-slate-100">
                Quente
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500">Cor de destaque</label>
                <input type="color" name="accentColor" value={resumeData.accentColor} onChange={handleChange} className="mt-2 w-full h-10 p-1 border border-slate-200 rounded" />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500">Cor da barra lateral</label>
                <input type="color" name="sidebarColor" value={resumeData.sidebarColor} onChange={handleChange} className="mt-2 w-full h-10 p-1 border border-slate-200 rounded" />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500">Cor de fundo das seções</label>
                <input type="color" name="sectionBgColor" value={resumeData.sectionBgColor} onChange={handleChange} className="mt-2 w-full h-10 p-1 border border-slate-200 rounded" />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500">Cor do texto principal</label>
                <input type="color" name="textColor" value={resumeData.textColor} onChange={handleChange} className="mt-2 w-full h-10 p-1 border border-slate-200 rounded" />
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* PAINEL DE VISUALIZAÇÃO (DIREITO) */}
      <div className="flex-1 bg-slate-200 overflow-y-auto flex justify-center p-4 md:p-8">
        <div className="a4-page shadow-2xl flex flex-row w-[210mm] min-h-[297mm] h-fit" style={{ color: resumeData.textColor, backgroundColor: resumeData.sectionBgColor }}>
          
          {/* LADO DA SIDEBAR DO CURRÍCULO (38%) */}
          <div className="w-[38%] text-white flex flex-col p-8" style={{ backgroundColor: resumeData.sidebarColor }}>
            {/* Círculo do Perfil/Foto */}
            <div className="w-36 h-36 rounded-full border-4 mx-auto mb-8 overflow-hidden flex items-center justify-center" style={{ borderColor: resumeData.sidebarColor, backgroundColor: resumeData.sectionBgColor }}>
              {resumeData.photo ? (
                <img src={resumeData.photo} alt="Foto do perfil" className="h-full w-full object-cover" />
              ) : (
                <User size={70} className="text-slate-400" />
              )}
            </div>

            <div className="space-y-6">
              {/* Contatos */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-3 border-b border-slate-700 pb-1" style={{ color: resumeData.accentColor }}>Contato</h3>
                <ul className="space-y-2.5 text-[11px] text-slate-300">
                  <li className="flex items-center gap-3"><Phone size={13} color={resumeData.accentColor} className="shrink-0" /> {resumeData.phone}</li>
                  <li className="flex items-center gap-3"><Mail size={13} color={resumeData.accentColor} className="shrink-0" /> {resumeData.email}</li>
                  <li className="flex items-center gap-3"><MapPin size={13} color={resumeData.accentColor} className="shrink-0" /> {resumeData.location}</li>
                  <li className="flex items-center gap-3"><Linkedin size={13} color={resumeData.accentColor} className="shrink-0" /> {resumeData.linkedin}</li>
                  <li className="flex items-center gap-3"><Github size={13} color={resumeData.accentColor} className="shrink-0" /> {resumeData.github}</li>
                </ul>
              </div>

              {/* Habilidades Técnicas (Barras de progresso) */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b border-slate-700 pb-1" style={{ color: resumeData.accentColor }}>Habilidades</h3>
                <div className="space-y-3">
                  {resumeData.skills.map((skill, i) => skill.name && (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-[10px] uppercase font-bold tracking-tight">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="skill-bar-bg">
                        <div className="skill-bar-fill" style={{ width: `${skill.level}%`, backgroundColor: resumeData.accentColor }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seção Dinâmica de Idiomas no Preview */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-3 border-b border-slate-700 pb-1" style={{ color: resumeData.accentColor }}>Idiomas</h3>
                <ul className="space-y-2 text-[11px]">
                  {resumeData.languages.map((lang, i) => lang.name && (
                    <li key={lang.id || i} className="flex justify-between border-b border-slate-700/40 pb-1">
                      <span className="font-bold">{lang.name}</span>
                      <span className="text-slate-400 italic text-[10px]">{lang.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* LADO DO CONTEÚDO PRINCIPAL (62%) */}
          <div className="w-[62%] p-10 flex flex-col gap-8">
            <header className="border-b-2 border-slate-100 pb-5">
              <h1 className="text-3xl font-black tracking-tight uppercase leading-tight" style={{ color: resumeData.textColor }}>{resumeData.name}</h1>
              <p className="text-xs font-bold uppercase tracking-[0.25em] mt-2" style={{ color: resumeData.accentColor }}>{resumeData.role}</p>
            </header>

            {/* Objetivo */}
            {resumeData.objective && (
              <section>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-800 mb-3 flex items-center gap-2">
                  <Target size={16} color={resumeData.accentColor} /> Objetivo Profissional
                </h3>
                <p className="text-[12px] leading-relaxed text-slate-600 text-justify">{resumeData.objective}</p>
              </section>
            )}

            {/* Formação Acadêmica */}
            <section>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-800 mb-5 flex items-center gap-2">
                <GraduationCap size={16} color={resumeData.accentColor} /> Formação Acadêmica
              </h3>
              <div className="space-y-5 border-l-2 border-slate-100 ml-1.5">
                {resumeData.education.map(edu => (edu.course || edu.institution) && (
                  <div key={edu.id} className="relative pl-5">
                    <div className="absolute w-2.5 h-2.5 rounded-full -left-[6px] top-1 ring-4 ring-white" style={{ backgroundColor: resumeData.accentColor }}></div>
                    <span className="text-[9px] font-bold bg-indigo-50 px-1.5 py-0.5 rounded" style={{ color: resumeData.accentColor, backgroundColor: `${resumeData.accentColor}22` }}>{edu.period}</span>
                    <h4 className="text-[13px] font-bold text-slate-800 mt-1 uppercase tracking-tight">{edu.course}</h4>
                    <p className="text-[11px] text-slate-500 font-medium italic">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </section>

            {resumeData.showExperience && resumeData.experience.some(exp => exp.role || exp.company || exp.period || exp.description) && (
              <section>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-800 mb-5 flex items-center gap-2">
                  <User size={16} color={resumeData.accentColor} /> Experiência Profissional
                </h3>
                <div className="space-y-5 border-l-2 border-slate-100 ml-1.5">
                  {resumeData.experience.map(exp => (exp.role || exp.company || exp.period || exp.description) && (
                    <div key={exp.id} className="relative pl-5">
                      <div className="absolute w-2.5 h-2.5 rounded-full -left-[6px] top-1 ring-4 ring-white" style={{ backgroundColor: resumeData.accentColor }}></div>
                      <span className="text-[9px] font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">{exp.period}</span>
                      <h4 className="text-[13px] font-bold text-slate-800 mt-1 uppercase tracking-tight">{exp.role}</h4>
                      <p className="text-[11px] text-slate-500 font-medium italic">{exp.company}</p>
                      <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Seção Dinâmica de Cursos no Preview */}
            <section>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-800 mb-4 flex items-center gap-2">
                <Award size={16} color={resumeData.accentColor} /> Cursos Complementares
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {resumeData.courses.map(course => (course.name || course.provider) && (
                  <div key={course.id} className="p-3 bg-slate-50 rounded-md flex flex-col justify-center" style={{ borderLeft: `4px solid ${resumeData.accentColor}` }}>
                    <h4 className="text-[12px] font-bold text-slate-800 leading-snug">{course.name}</h4>
                    <div className="flex justify-between items-center mt-1 text-[11px]">
                      <p className="text-slate-500 font-medium">{course.provider}</p>
                      <span className="text-[9px] font-bold px-1.5 rounded uppercase tracking-tighter" style={{ color: resumeData.accentColor, backgroundColor: `${resumeData.accentColor}22` }}>{course.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Competências Fixas/Estilizadas */}
            <section>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-800 mb-3 flex items-center gap-2">
                <Lightbulb size={16} color={resumeData.accentColor} /> Competências
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {resumeData.competencies.map((comp, i) => (
                  <span key={i} className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                    ✓ {comp}
                  </span>
                ))}
              </div>
            </section>

          </div>

        </div>
      </div>
    </div>
  );
}