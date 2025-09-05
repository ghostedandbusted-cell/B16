import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Save, 
  Upload, 
  Download, 
  Trash2, 
  Plus,
  FileText,
  Settings,
  Play
} from 'lucide-react';
import toast from 'react-hot-toast';

const TemplatesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
`;

const Button = styled.button`
  background: ${props => props.variant === 'primary' ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.variant === 'primary' ? 'white' : props.theme.colors.text};
  border: 1px solid ${props => props.variant === 'primary' ? 'transparent' : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.variant === 'primary' ? props.theme.colors.primaryDark : props.theme.colors.secondary};
  }
`;

const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const TemplateCard = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.md};
    transform: translateY(-2px);
  }
`;

const TemplateHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const TemplateIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.color}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
`;

const TemplateInfo = styled.div`
  flex: 1;
`;

const TemplateName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.xs} 0;
`;

const TemplateDescription = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textLight};
  margin: 0;
`;

const TemplateStats = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Stat = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textLight};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TemplateActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const ActionButton = styled.button`
  flex: 1;
  background: ${props => props.variant === 'primary' ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.variant === 'primary' ? 'white' : props.theme.colors.text};
  border: 1px solid ${props => props.variant === 'primary' ? 'transparent' : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  transition: all 0.2s ease;
  font-size: 0.875rem;
  
  &:hover {
    background: ${props => props.variant === 'primary' ? props.theme.colors.primaryDark : props.theme.colors.secondary};
  }
`;

const DangerButton = styled(ActionButton)`
  color: ${props => props.theme.colors.danger};
  border-color: ${props => props.theme.colors.danger};
  
  &:hover {
    background: ${props => props.theme.colors.danger}10;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xxl};
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  color: ${props => props.theme.colors.textLight};
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.text};
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 0.875rem;
  min-height: 100px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }
`;

const FileInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 0.875rem;
  background: white;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xxl};
  color: ${props => props.theme.colors.textLight};
`;

const presetTemplates = [
  {
    id: 'contact-scraper',
    name: 'Contact Information Scraper',
    description: 'Extract emails, phones, and addresses from contact pages',
    rules: [
      { name: 'Email Addresses', type: 'regex', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
      { name: 'Phone Numbers', type: 'regex', pattern: '(\\+?1[-.\\s]?)?\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})' },
      { name: 'Addresses', type: 'regex', pattern: '(\\d+\\s+[A-Za-z0-9\\s,.-]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Drive|Dr|Lane|Ln|Way|Place|Pl|Court|Ct|Circle|Cir|Parkway|Pkwy|Highway|Hwy|Route|Rt|North|N|South|S|East|E|West|W|Northeast|NE|Northwest|NW|Southeast|SE|Southwest|SW))' }
    ],
    color: '#6366f1'
  },
  {
    id: 'social-media-scraper',
    name: 'Social Media Scraper',
    description: 'Find social media profiles and links',
    rules: [
      { name: 'Facebook', type: 'regex', pattern: '(?:https?:\\/\\/)?(?:www\\.)?facebook\\.com\\/[a-zA-Z0-9._-]+' },
      { name: 'Twitter', type: 'regex', pattern: '(?:https?:\\/\\/)?(?:www\\.)?twitter\\.com\\/[a-zA-Z0-9._-]+' },
      { name: 'LinkedIn', type: 'regex', pattern: '(?:https?:\\/\\/)?(?:www\\.)?linkedin\\.com\\/in\\/[a-zA-Z0-9._-]+' },
      { name: 'Instagram', type: 'regex', pattern: '(?:https?:\\/\\/)?(?:www\\.)?instagram\\.com\\/[a-zA-Z0-9._-]+' }
    ],
    color: '#8b5cf6'
  },
  {
    id: 'business-info-scraper',
    name: 'Business Information Scraper',
    description: 'Extract business names, hours, and contact details',
    rules: [
      { name: 'Business Names', type: 'css', selector: 'h1, .business-name, .company-name' },
      { name: 'Phone Numbers', type: 'regex', pattern: '(\\+?1[-.\\s]?)?\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})' },
      { name: 'Email Addresses', type: 'regex', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
      { name: 'Addresses', type: 'css', selector: '.address, .location, [itemprop="address"]' }
    ],
    color: '#10b981'
  }
];

function Templates({ rules, onLoadRules }) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSaveTemplate = async () => {
    if (!templateName.trim()) {
      toast.error('Please enter a template name');
      return;
    }

    if (rules.length === 0) {
      toast.error('No rules to save');
      return;
    }

    try {
      const template = {
        name: templateName,
        description: templateDescription,
        rules: rules,
        createdAt: new Date().toISOString()
      };

      const dataStr = JSON.stringify(template, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${templateName.replace(/\s+/g, '-').toLowerCase()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Template saved successfully!');
      setShowSaveModal(false);
      setTemplateName('');
      setTemplateDescription('');
    } catch (error) {
      toast.error('Failed to save template: ' + error.message);
    }
  };

  const handleLoadTemplate = async (template) => {
    try {
      onLoadRules(template.rules);
      toast.success(`Template "${template.name}" loaded successfully!`);
    } catch (error) {
      toast.error('Failed to load template: ' + error.message);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const template = JSON.parse(e.target.result);
          if (template.rules && Array.isArray(template.rules)) {
            onLoadRules(template.rules);
            toast.success(`Template "${template.name}" loaded successfully!`);
          } else {
            toast.error('Invalid template file format');
          }
        } catch (error) {
          toast.error('Failed to parse template file: ' + error.message);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <TemplatesContainer>
      <Header>
        <Title>Rule Templates</Title>
        <HeaderActions>
          <Button onClick={() => setShowLoadModal(true)}>
            <Upload size={16} />
            Load Template
          </Button>
          <Button onClick={() => setShowSaveModal(true)} variant="primary">
            <Save size={16} />
            Save Current Rules
          </Button>
        </HeaderActions>
      </Header>

      <TemplatesGrid>
        {presetTemplates.map((template) => (
          <TemplateCard key={template.id}>
            <TemplateHeader>
              <TemplateIcon color={template.color}>
                <Settings size={24} />
              </TemplateIcon>
              <TemplateInfo>
                <TemplateName>{template.name}</TemplateName>
                <TemplateDescription>{template.description}</TemplateDescription>
              </TemplateInfo>
            </TemplateHeader>

            <TemplateStats>
              <Stat>
                <StatValue>{template.rules.length}</StatValue>
                <StatLabel>Rules</StatLabel>
              </Stat>
              <Stat>
                <StatValue>{template.rules.filter(r => r.type === 'regex').length}</StatValue>
                <StatLabel>Regex</StatLabel>
              </Stat>
              <Stat>
                <StatValue>{template.rules.filter(r => r.type === 'css').length}</StatValue>
                <StatLabel>CSS</StatLabel>
              </Stat>
            </TemplateStats>

            <TemplateActions>
              <ActionButton onClick={() => handleLoadTemplate(template)} variant="primary">
                <Play size={16} />
                Load
              </ActionButton>
              <ActionButton onClick={() => {
                const dataStr = JSON.stringify(template, null, 2);
                const dataBlob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${template.name.replace(/\s+/g, '-').toLowerCase()}.json`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              }}>
                <Download size={16} />
                Download
              </ActionButton>
            </TemplateActions>
          </TemplateCard>
        ))}
      </TemplatesGrid>

      {showSaveModal && (
        <Modal onClick={() => setShowSaveModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Save Template</ModalTitle>
              <CloseButton onClick={() => setShowSaveModal(false)}>
                ×
              </CloseButton>
            </ModalHeader>
            
            <FormGroup>
              <Label>Template Name</Label>
              <Input
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="Enter template name"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Description (Optional)</Label>
              <Input
                type="text"
                value={templateDescription}
                onChange={(e) => setTemplateDescription(e.target.value)}
                placeholder="Enter description"
              />
            </FormGroup>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <Button onClick={() => setShowSaveModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveTemplate} variant="primary">
                <Save size={16} />
                Save Template
              </Button>
            </div>
          </ModalContent>
        </Modal>
      )}

      {showLoadModal && (
        <Modal onClick={() => setShowLoadModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Load Template</ModalTitle>
              <CloseButton onClick={() => setShowLoadModal(false)}>
                ×
              </CloseButton>
            </ModalHeader>
            
            <FormGroup>
              <Label>Upload Template File</Label>
              <FileInput
                type="file"
                accept=".json"
                onChange={handleFileUpload}
              />
            </FormGroup>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <Button onClick={() => setShowLoadModal(false)}>
                Cancel
              </Button>
            </div>
          </ModalContent>
        </Modal>
      )}
    </TemplatesContainer>
  );
}

export default Templates;